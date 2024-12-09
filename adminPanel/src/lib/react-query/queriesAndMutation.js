import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserAccount, deleteEvent, findUserByEmail, getPastInfiniteEvents, getUpcommingInfiniteEvents, getUpdateEvent, signInUser, signOutUser, toggleIsActive, toggleShowOnHomePage, toggleTicketRelease } from "../appwrite/api";
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

// get events events infinte
export const useGetUpcommingEvents = () => {
   return useInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_UPCOMMING_EVENTS],
      queryFn: getUpcommingInfiniteEvents,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
         if (lastPage && lastPage.documents.length === 0) return null;
         const lastId = lastPage?.documents[lastPage.documents.length - 1].$id;
         return lastId ?? null;
      },
      initialPageParam: null,
   })
};

// get events events infinte
export const useGetPastEvents = () => {
   return useInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_PAST_EVENTS],
      queryFn: getPastInfiniteEvents,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
         if (lastPage && lastPage.documents.length === 0) return null;
         const lastId = lastPage?.documents[lastPage.documents.length - 1].$id;
         return lastId ?? null;
      },
      initialPageParam: null,
   })
};

export const useDeactiveEvent = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: [QUERY_KEYS.TOGGLE_EVENTS],
      mutationFn: ({ eventId, isActive }) => toggleIsActive(eventId, isActive),
      onSuccess: () => {
         queryClient.invalidateQueries([QUERY_KEYS.GET_UPCOMMING_EVENTS]);
      },
      onError: (error) => {
         console.error("Error toggling event:", error);
      },
   });
};

export const useToggleShowOnHomePage = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: [QUERY_KEYS.TOGGLE_SHOW_ON_HOME_PAGE],
      mutationFn: ({ eventId, isShowingInHomePage }) => toggleShowOnHomePage(eventId, isShowingInHomePage),
      onSuccess: () => {
         queryClient.invalidateQueries([QUERY_KEYS.GET_UPCOMMING_EVENTS]);
      },
      onError: (error) => {
         console.error("Error toggling event:", error);
      },
   });
}

// is toggle is ticket relesed
export const useToggleTicketRelease = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: [QUERY_KEYS.TOGGLE_TICKET_RELEASE],
      mutationFn: ({ eventId, isTicketReleased }) => toggleTicketRelease(eventId, isTicketReleased),
      onSuccess: () => {
         queryClient.invalidateQueries([QUERY_KEYS.GET_UPCOMMING_EVENTS]);
      },
      onError: (error) => {
         console.error("Error toggling event:", error);
      },
   });
}

// delete event by id
export const useDeleteEvent = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: [QUERY_KEYS.DELETE_EVENT],
      mutationFn: (eventId) => deleteEvent(eventId),
      onSuccess: () => {
         queryClient.invalidateQueries([QUERY_KEYS.GET_UPCOMMING_EVENTS]);
      },
      onError: (error) => {
         console.error("Error deleting event:", error);
      },
   });
};


//  update event by id
export const useUpdateEvent = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: [QUERY_KEYS.UPDATE_EVENTS],
      mutationFn: ({ event, eventId }) => getUpdateEvent(event, eventId),
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_UPCOMMING_EVENTS],
         });
      },
      onError: (error) => {
         console.error("Event not updating:", error);
      },
   });
};
