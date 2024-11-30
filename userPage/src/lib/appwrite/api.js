import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatar, database } from "./config";

export async function createUserAccount(user) {
   try {
      const newAcount = await account.create(
         ID.unique(),
         user.email,
         user.password,
         user.name
      )
      if (!newAcount) throw Error;
      const imageUrl = avatar.getInitials(user.name);

      const newUser = await saveUserToDatabase({
         userId: newAcount.$id,
         email: newAcount.email,
         name: newAcount.name,
         imageUrl: imageUrl,
      })
      return newUser;

   } catch (error) {
      console.error(error);
   }
}

export async function saveUserToDatabase(user) {
   try {
      const newUser = await database.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         ID.unique(),
         user,
      )

      return newUser;
   } catch (error) {
      console.error(error);
   }
};

export async function signInUser(user) {
   try {
      // Check if the user is already logged in
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
         console.log("User already signed in");
         return currentAccount;
      }

      // If no active session, create a new session using email and password
      const session = await account.createEmailPasswordSession(
         user.email,
         user.password
      );

      console.log("New session created:", session);
      return session;
   } catch (error) {
      console.error("Error in signInUser:", error);
      return null;
   }
}

export async function getCurrentUser() {
   try {
      const currentAccount = await account.get();
      if (!currentAccount) {
         return null;
      }
      const currentUser = await database.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         [Query.equal('userId', currentAccount.$id)]
      );
      if (currentUser.documents.length === 0) {
         throw Error;
      }
      return currentUser.documents[0];
   } catch (error) {
      console.error("Error fetching current user:", error);
   }
}

export async function signOutUser() {
   try {
      const response = await account.deleteSession("current");
      console.log("Sign out response:", response);
      return response;
   } catch (error) {
      console.error("Error signing out user:", error);
   }
}

// get recent three events
export async function getRecentEvents() {
   try {
      const events = await database.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId,
         [
            Query.orderAsc("eventTime"),
            Query.equal("isActive", true),
            Query.limit(3) // Adjusted to fetch only the three most recent events
         ]
      );

      // Clean up data to remove unwanted fields
      const sanitizedEvents = events.documents.map(event => {
         const { entryPass, organizers, $permissions, $createdAt, $updatedAt, ...cleanedEvent } = event;
         return cleanedEvent;
      });

      // console.log("Recent 3 sanitized events fetched:", sanitizedEvents);
      return sanitizedEvents;
   } catch (error) {
      console.error("Error fetching recent events:", error);
   }
}


// get event by id
export async function getEventById(id) {
   try {
      const event = await database.getDocument(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId,
         id
      );
      // console.log("Event fetched by id:", event);
      return event;
   } catch (error) {
      console.error("Error fetching event by id:", error);
   }
}

//  get user by ID
export async function getUserById(id) {
   // console.log("getUserById id:", id);
   try {
      const user = await database.getDocument(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         id
      );
      // console.log("User fetched by id:", user);
      return user;
   } catch (error) {
      console.error("Error fetching user by id:", error);
   }
}

// Generate Entry Pass
export async function generateEntryPass(passData) {

   try {
      // Generate a valid entryId (UUID ensures uniqueness and validity)
      const entryId = ID.unique();

      const entryPassData = {
         entryId,
         users: passData.users,
         events: passData.events,
         purpus: passData.purpus,
         stream: passData.stream,
         department: passData.department,
         phone: passData.phone,
         institute: passData.institute,
      };

      const checkForElegable = checkEventForEntryPass(passData.events);
      if (checkForElegable == false) {
         throw Error;
      }

      const entryPass = await database.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.entryPassCollectionId,
         entryId,
         entryPassData,
      );

      // console.log("Entry pass generated:", entryPass);
      return entryPass;
   } catch (error) {
      console.error("Error generating entry pass:", error);
   }
}

// check the event is for elegable for entry pass
export async function checkEventForEntryPass(eventId) {
   try {
      // fetch the event by id
      const event = await getEventById(eventId);
      if (!event) {
         return false;
      }

      // check the event is active or not
      if (!event.isActive == false) {
         return false;
      }
      // check the event is not ended
      const eventTime = event.eventTime;
      let currentTime = new Date().getTime();
      if (eventTime < currentTime) {
         return false;
      }
      // check the event is not full
      const totalSeats = event.maxCapacity;
      const sizeOfentryPass = event.entryPass.length;
      if (sizeOfentryPass >= totalSeats) {
         return false;
      }
      // check the event is not started
      const eventStartTime = event.eventTime;
      currentTime = new Date().getTime();
      if (eventStartTime > currentTime) {
         return false;
      }

      return true;

   } catch (error) {
      console.error("Error checking event for entry pass:", error);
      return false;
   }
}

// get entry pass by id
export async function getEntryPassById(id) {
   try {
      const entryPass = await database.getDocument(
         appwriteConfig.databaseId,
         appwriteConfig.entryPassCollectionId,
         id
      );
      // console.log("Entry pass fetched by id:", entryPass);
      return entryPass;
   } catch (error) {
      console.error("Error fetching entry pass by id:", error);
   }
}

// get infinte events
export async function getInfiniteEvents({ pageParam }) {
   const queries = [Query.orderDesc('$updatedAt'), Query.limit(5)];
   if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
   }
   try {
      const events = await database.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId,
         queries
      )
      if (!events) throw Error;

      return events;
   } catch (error) {
      console.error("Error fetching infinite events:", error);
      throw error;
   }

}

// get all clubMembers post 
export async function getClubMembers() {
   try {
      const roles = [
         'president',
         'vice-president',
         'tech-lead',
         'design-lead',
         'web-dev-lead',
         'app-dev-lead',
         'specializations-lead',
         'marketing-content'
      ];

      const clubMembers = await database.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         [Query.equal('role', roles)]
      );

      return clubMembers.documents;
   } catch (error) {
      console.error("Error fetching club members:", error);
   }
}
