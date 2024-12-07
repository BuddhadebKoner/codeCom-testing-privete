import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEvent, createUserAccount, findUserByEmail, signInUser, signOutUser } from "../appwrite/api";
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

export const useSignOutUser = () => { 
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: [QUERY_KEYS.SIGN_OUT_USER],
      mutationFn: signOutUser,
      onSuccess: () => {
         // Invalidate the cache for the current user after signing out
         queryClient.invalidateQueries([QUERY_KEYS.GET_CURRENT_USER]);
         queryClient.setQueryData([QUERY_KEYS.GET_CURRENT_USER], null);
      },
      onError: (error) => {
         console.error("Error signing out user:", error);
      },
   });
};

export const useFindUserByEmail = () => {
   return useMutation({
      mutationKey: [QUERY_KEYS.FIND_USER_BY_EMAIL],
      mutationFn: (email) => findUserByEmail(email),
      onError: (error) => {
         console.error("Error finding user by email:", error);
      },
   });
};


// add event 
export const useAddEvent = () => { 
   return useMutation({
      mutationKey: [QUERY_KEYS.ADD_EVENT],
      mutationFn: (event) => addEvent(event),
      onSuccess: (newEvent) => {
         console.log("Event added successfully:", newEvent);
      },
      onError: (error) => {
         console.error("Error adding event:", error);
      },
   });
}