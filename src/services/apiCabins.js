import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  // console.log(newCabin, id);
  const hasImagepath = newCabin.image?.startsWith?.(supabaseUrl);
  // https://tfoipuycfvwsjiidgzkf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagepath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  console.log(newCabin);

  //! A) create cabin is there is no ID
  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // ! B) is there´s an id EDIT
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be created");
  }

  //! upload image
  if (hasImagepath) return data;
  const { error: StorageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //! delete cabin if there was an error uploadinmg image
  if (StorageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(StorageError);
    throw new Error(
      "Cabins image could not be uploaded, and cabin was not created"
    );
  }

  return data;
}
