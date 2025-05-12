import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
  const [searchP] = useSearchParams();
  const filterField = searchP.get("status");
  const filter =
    !filterField || filterField === "all"
      ? null
      : { field: "status", value: filterField, method: "eq" };

  const sortField = searchP.get("sortBy") || "startDate-desc";
  const [field, direction] = sortField.split("-");

  const sortBy = { field, direction };
  // !pagination
  const page = !searchP.get("page") ? 1 : Number(searchP.get("page"));

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  // console.log(data);

  //! pre fetch
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, isLoading, error, count };
}

export default useBookings;
