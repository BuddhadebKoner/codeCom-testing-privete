import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
   createUserAccount,
   signInUser,
   signOutUser,
   getAllEvents,
   getEventById,
} from "../appwrite/api";
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

// Hook for signing in a user
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

// Hook for fetching all events
export const useGetAllEvents = () => {
   return useQuery({
      queryKey: [QUERY_KEYS.GET_ALL_EVENTS],
      queryFn: getAllEvents,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      onError: (error) => {
         console.error("Error fetching all events:", error);
      },
   });
};

// get events by id
export const useEventById = (id) => {
   return useQuery({
      queryKey: [QUERY_KEYS.GET_EVENT_BY_ID, id],
      queryFn: () => getEventById(id),
      enabled: !!id,
   })
};