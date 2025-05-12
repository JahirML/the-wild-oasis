import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,

    onSuccess() {
      toast.success("Booking succesfully edited");
      queryClient.invalidateQueries({ active: true });
    },

    onError(err) {
      toast.error(err.message);
    },
  });

  return { deleteBooking, isDeleting };
}

export default useDeleteBooking;
