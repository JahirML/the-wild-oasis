import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useUpdateBooking() {
  const queryclient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: updateBookingFn, isLoading: isUpdating } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess(data) {
      console.log(data);
      toast.success(`Booking ${data.id} succesfully checked in`);
      queryclient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateBookingFn, isUpdating };
}

export default useUpdateBooking;
