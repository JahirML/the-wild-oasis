export async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name`");
  // console.log(res);
  const data = await res.json();
  console.log(data);
  return data | [];
}

export async function getcountry(name) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const data = await res.json();
  return data[0];
}
