import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const { mutate: login, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      console.log(data);
      queryclient.setQueryData(["user"], data.user);
      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      console.log(err);
      toast.error("Provided email email or password are incorrect");
    },
  });

  return { login, isLogin };
}
