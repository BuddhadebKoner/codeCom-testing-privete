import { ID } from "appwrite";
import { account, appwriteConfig, avatar, database } from "./config";

export async function createUserAccount(user){
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
         accountId: newAcount.$id,
         email: newAcount.email,
         fullname: newAcount.name,
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