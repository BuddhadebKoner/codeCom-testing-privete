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
