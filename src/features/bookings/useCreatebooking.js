import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCreatebooking() {
  const queryClient = useQueryClient();
  const { mutate: createBooking, isLoading } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Booking succesfully created");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { createBooking, isLoading };
}

export default useCreatebooking;
