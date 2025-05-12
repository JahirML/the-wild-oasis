import supabase from "./supabase";

export async function getGuests() {
  let { data, error } = await supabase.from("guests").select("*");

  if (error) throw new Error("Guest could not be fetched");
  return data;
}

export async function createGuest(guest) {
  const { data, error } = await supabase
    .from("guests")
    .insert([guest])
    .select()
    .single();

  if (error) throw new Error("Error al crear el usuario");
  console.log(data);
  return data.id; // ✅ Devuelve el ID
}
