import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateUserApi } from "../../services/apiAuth";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,

    onSuccess: (/* { user } */) => {
      // console.log(user);
      toast.success("User account succesfully updated");

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { updateUser, isUpdating };
}

export default useUpdateUser;
