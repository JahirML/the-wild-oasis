import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckout() {
  const queryclient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: checkout, isLoading: isCheckingout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess(data) {
      console.log(data);
      toast.success(`Booking ${data.id} succesfully checked out`);
      queryclient.invalidateQueries({ active: true });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkout, isCheckingout };
}

export default useCheckout;
