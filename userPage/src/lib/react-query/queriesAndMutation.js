import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
   createUserAccount,
   signInUser,
   signOutUser,
   getEventById,
   getRecentEvents,
   getUserById,
   generateEntryPass,
   getEntryPassById,
   getInfiniteEvents,
   getClubMembers,
   getUpdateUserProfile,
   searchEvents,
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


// get recent events
export const useGetRecentEvents = () => {
   return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_EVENTS],
      queryFn: getRecentEvents,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      onError: (error) => {
         console.error("Error fetching recent events:", error);
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

// get user details by id
export const useUserById = (id) => {
   return useQuery({
      queryKey: [QUERY_KEYS.GET_USER_BY_ID, id],
      queryFn: () => getUserById(id),
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: true,
      enabled: !!id,
   });
};


// register to an event
export const useGenerateEntryPass = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationKey: [QUERY_KEYS.GENERATE_ENTRY_PASS],
      mutationFn: async (passData) => {
         if (!passData) {
            throw new Error("Missing passData or event for generating entry pass.");
         }
         return await generateEntryPass(passData);
      },
      onSuccess: (newPass) => {
         queryClient.invalidateQueries([QUERY_KEYS.GET_ENTRY_PASS]);
         queryClient.setQueryData([QUERY_KEYS.GET_ENTRY_PASS], newPass);
      },
      onError: (error) => {
         console.error("Error creating user account:", error);
      },
   });
};

// get entry pass by id
export const useGetEntryPass = (id) => {
   return useQuery({
      queryKey: [QUERY_KEYS.GET_ENTRY_PASS, id],
      queryFn: () => getEntryPassById(id),
      enabled: !!id,
   });
};

// get upcomming events infinte
export const useGetUpcommingEvents = () => {
   return useInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_UPCOMMING_EVENTS],
      queryFn: getInfiniteEvents,
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

// get club members 
export const useGetClubMembers = () => {
   return useQuery({
      queryKey: [QUERY_KEYS.GET_CLUB_MEMBERS],
      queryFn: getClubMembers,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
   });
};

export const useUpdateProfile = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (user) => getUpdateUserProfile(user),
      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER],
         });
         queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_USER_BY_ID, variables.userId],
         });
      },
   });
};


// search post useSearchPost
export const useSearchEvents = (searchTurm) => {
   return useQuery({
      queryKey: [QUERY_KEYS.SEARCH_EVENTS, searchTurm],
      queryFn: () => searchEvents(searchTurm),
      enabled: !!searchTurm
   })
}