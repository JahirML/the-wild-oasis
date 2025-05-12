import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryclient.removeQueries();
      navigate("/login", { replace: true });
    },

    onError: (err) => {
      console.log(err);
      toast.error("There was an error while login out");
    },
  });

  return { logout, isLoading };
}
