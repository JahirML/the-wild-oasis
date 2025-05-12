import { useQuery } from "@tanstack/react-query";
import { getCountries } from "../../services/apiCountries";

function useCountries() {
  const { data: countries, isLoading: isLoadingCountries } = useQuery({
    queryKey: ["country"],
    queryFn: getCountries,
  });
  //   console.log(countries);
  return { countries, isLoadingCountries };
}

export default useCountries;
