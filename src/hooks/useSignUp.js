import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRequest } from "../utils/fetchRequest";
import { showToast } from "../services/showToast";

function useSignUp() {
  const queryClient = useQueryClient();
  // Signup Mutation
  const {
    mutate: signup,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: ({ name, email, password, passwordConfirm }) =>
      fetchRequest("auth/signup", "POST", {
        name,
        email,
        password,
        passwordConfirm,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]); // Refetch user data
      showToast("Successfully Registered", "success");
    },

    onError: (err) => {
      showToast(err.message, "danger");
    },
  });
  return { signup, isLoading };
}

export default useSignUp;
