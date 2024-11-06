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
   try {
      const newEvent = await database.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId,
         event
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