import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRequest } from "../utils/fetchRequest";
import toast from "react-hot-toast/headless";
import { showToast } from "../services/showToast";
// import { showToast } from "../services/toastService";

export function useLogIn() {
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) =>
      fetchRequest("auth/login", "POST", { email, password }),

    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]); // Refetch user data
      showToast("Successfully logged in", "success");
    },

    onError: (error) => {
      showToast(error.message, "danger");
    },
  });

  return { login, isLoading, error };
}
