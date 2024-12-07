import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserAccount, signInUser } from "../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

// Hook for creating a new user account
export const useCreateUserAccount = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: [QUERY_KEYS.CREATE_USER_ACCOUNT],
      mutationFn: createUserAccount,
      onSuccess: (newUser) => {
         // Invalidate the cache for the current user and update with the new user
         queryClient.invalidateQueries([QUERY_KEYS.GET_CURRENT_USER]);
         queryClient.setQueryData([QUERY_KEYS.GET_CURRENT_USER], newUser);
      },
      onError: (error) => {
         console.error("Error creating user account:", error);
      },
   });
};

export const useSignInUser = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: [QUERY_KEYS.SIGN_IN_USER],
      mutationFn: signInUser,
      onSuccess: (session) => {
         // Update cache for current user after successful login
         queryClient.invalidateQueries([QUERY_KEYS.GET_CURRENT_USER]);
         queryClient.setQueryData([QUERY_KEYS.GET_CURRENT_USER], session);
      },
      onError: (error) => {
         console.error("Error signing in user:", error);
      },
   });
};