// queryKeys.js
export const QUERY_KEYS = {
   // AUTH KEYS
   CREATE_USER_ACCOUNT: "createUserAccount",
   SIGN_IN_USER: "signInUser",
   SIGN_OUT_USER: "signOutUser",

   // USER KEYS
   GET_CURRENT_USER: "getCurrentUser",
   GET_USER_BY_ID: "getUserById",
   GET_CLUB_MEMBERS: "getClubMembers",
   FIND_USER_BY_EMAIL: "findUserByEmail",

   // EVENT KEYS
   GET_ALL_EVENTS: "getAllEvents",
   GET_EVENT_BY_ID: "getEventById",
   GET_UPCOMMING_EVENTS: "getUpcommingEvents",
   SEARCH_EVENTS: "searchEvents",
   GET_PAST_EVENTS: "getPastEvents",
   TOGGLE_EVENTS: "toggleEvents",
   DELETE_EVENT: "deleteEvent",
   TOGGLE_SHOW_ON_HOME_PAGE: "toggleShowOnHomePage",

   // ENTRY PASS 
   GENERATE_ENTRY_PASS: "generateEntryPass",
   GET_ENTRY_PASS: "getEntryPass",
   TOGGLE_TICKET_RELEASE: "toggleTicketRelease",
};