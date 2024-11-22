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
            Query.orderDesc("eventTime"),
            Query.limit(3)
         ]
      );
      // console.log("Recent 3 events fetched:", events);
      return events.documents;
   } catch (error) {
      console.error("Error fetching recent events:", error);
   }
}


//  get all events data 
export async function getUpcommingEvents() {
   try {
      const events = await database.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId
      );
      // console.log("All events fetched:", events);
      return events.documents;
   } catch (error) {
      console.error("Error fetching all events:", error);
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
   console.log(passData);
   try {
      const {
         entryId,
         users,
         events,
         purpus,
         stream,
         department,
         phone,
         institute,
      } = passData;

      // Validate input data
      if (!entryId || !users || !events || !purpus || !stream || !department || !phone || !institute) {
         throw new Error("All fields are required.");
      }

      // Check event capacity
      const eventStatus = await checkEventCapacity(events);
      console.log(eventStatus);

      if (eventStatus.status === "inactive") {
         throw new Error(`Event is inactive: ${eventStatus.message}`);
      }

      if (eventStatus.status === "full") {
         throw new Error(`Event is full: ${eventStatus.message}`);
      }

      // Update seat count in the event document
      const availableSeats = eventStatus.remainingSpots || 0;
      if (availableSeats <= 0) {
         throw new Error("No seats available.");
      }

      await database.updateDocument(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId,
         events,
         {
            seatsAvailable: availableSeats - 1,
            entryPass: [...eventStatus.entryPass, entryId], // Add entry ID to the list
         }
      );

      // Store entry pass in the database
      const entryPass = await database.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.entryPassCollectionId,
         entryId,
         {
            users,
            events,
            purpus,
            stream,
            department,
            phone,
            institute,
            createdAt: new Date().toISOString(),
         }
      );

      return entryPass;
   } catch (error) {
      console.error("Error generating entry pass:", error.message);
      throw new Error(error.message || "Failed to generate entry pass.");
   }
}



async function checkEventCapacity(eventId) {
   try {
      // Fetch event data from the database
      const eventData = await database.getDocument(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId,
         eventId
      );

      // Destructure relevant fields
      const { isActive, maxCapacity, entryPass = [], title } = eventData;

      // Check if the event is active
      if (!isActive) {
         return {
            eventId,
            status: "inactive",
            message: `The event "${title}" is not active.`,
         };
      }

      // Compare entryPass count and maxCapacity
      const entryCount = entryPass.length;
      if (entryCount >= maxCapacity) {
         return {
            eventId,
            status: "full",
            message: `The event "${title}" has reached its maximum capacity of ${maxCapacity}.`,
         };
      }

      // If the event is active and not full
      return {
         eventId,
         status: "open",
         message: `The event "${title}" is active and has ${maxCapacity - entryCount} spots left.`,
      };
   } catch (error) {
      console.error("Error checking event capacity:", error.message);
      throw new Error(error.message || "Failed to check event capacity.");
   }
}
