import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatar, database } from "./config";

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

      console.log("New session created:");
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


export async function addEvent(event) {
   // adding a unque event id thet is eventCollectionId + current timeStamp
   const eventId =  ID.unique() + '-' + Date.now();
   event = { ...event, eventId };
   try {
      const newEvent = await database.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId,
         ID.unique(),
         event,
      );
      return newEvent;
   } catch (error) {
      console.error("Error adding event:", error);
   }
}

// find user using email 
export async function findUserByEmail(email) {
   try {
      const user = await database.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         [Query.equal('email', email)]
      );
      if (user.documents.length === 0) {
         return null;
      }
      return user.documents[0];
   } catch (error) {
      console.error("Error finding user by email:", error);
   }
}

//  get all events data 
export async function getAllEvents() {
   try {
      const events = await database.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId
      );
      return events.documents;
   } catch (error) {
      console.error("Error fetching all events:", error);
   }
}


// active or inactive event

export async function updateEvent(eventId, data) {
   try {
      const updatedEvent = await database.updateDocument(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId,
         eventId,
         data
      );
      return updatedEvent;
   } catch (error) {
      console.error("Error updating event:", error);
   }
   
}