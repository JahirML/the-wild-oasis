import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable({ render }) {
  const { cabins, error, isLoading } = useCabins();
  // console.log(cabins);
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  // ! Filter cabins
  const filterValue = searchParams.get("discount") || "all";
  let filterCabins;

  if (filterValue === "all") filterCabins = cabins;

  if (filterValue === "no-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount == 0);

  if (filterValue === "with-discount")
    filterCabins = cabins.filter((cabin) => cabin.discount > 0);

  // ! sort cabins

  const sortBy = searchParams.get("sortBy") || "name-asc";

  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filterCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={filterCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
