import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchP, setSearchP] = useSearchParams();
  const sortby = searchP.get("sortBy") || "";
  function handleChange(e) {
    searchP.set("sortBy", e.target.value);
    setSearchP(searchP);

    // console.log(e.target.value);
  }
  return (
    <Select
      value={sortby}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
