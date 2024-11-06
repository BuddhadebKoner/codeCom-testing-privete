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
         return currentAccount; // Return the current account session if already signed in
      }

      // If no active session, create a new session using email and password
      const session = await account.createEmailPasswordSession(
         user.email,  // Pass email as the first argument
         user.password // Pass password as the second argument
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