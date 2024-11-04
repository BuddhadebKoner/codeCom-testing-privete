import { ID } from "appwrite";
import { account, appwriteConfig, avatar, database } from "./config";

export async function loginUser(email, password) { 
   try {
      const user = await account.createSession(email, password);
      return user;
   } catch (error) {
      console.log(error);
   }
}

export async function addEvent(event) {
   try {
      const newEvent = await database.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId,
         ID.unique(),
         event,
      )

      return newEvent;
   } catch (error) {
      console.log(error);
   }
}