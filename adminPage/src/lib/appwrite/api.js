import { ID, ImageGravity, Query } from "appwrite";
import { account, appwriteConfig, avatar, database, storage } from "./config";

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

// sign out user
export async function signOutUser() {
   try {
      await account.deleteSession("current");
      console.log("User signed out");
   } catch (error) {
      console.error("Error in signOutUser:", error);
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

// add event
export async function addEvent(event) {
   // adding a unque event id thet is eventCollectionId + current timeStamp
   const eventId = ID.unique() + '-' + Date.now();
   event = { ...event, eventId };
   console.log("Event data:", event);
   try {
      const uploadedBanner = await uploadfile(event.banner);
      if (!uploadedBanner) throw new Error("Error uploading banner");
      // get the url
      const fileUrl = getFilePreview(uploadedBanner.$id);
      if (!fileUrl) {
         await deleteFile(uploadedBanner.$id);
         throw new Error("Error getting file URL");
      }

      const newEvent = await database.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId,
         ID.unique(),
         {
            eventId: event.eventId,
            title: event.title,
            desc: event.desc,
            eventTime: event.eventTime,
            eventPlace: event.eventPlace,
            maxCapacity: event.maxCapacity,
            locationUrl: event.locationUrl,
            organizers: event.organizers,
            imageUrl: fileUrl,
            imageId: uploadedBanner.$id
         }
      );
      return newEvent;
   } catch (error) {
      console.error("Error adding event:", error);
   }
}
// supporting functions that many time will be used 
export async function uploadfile(file) {
   console.log("file receiving uploadfile:", file);
   try {
      if (!file) throw new Error("No file provided");

      const uploadedFile = await storage.createFile(
         appwriteConfig.bannerStorage,
         ID.unique(),
         file
      );

      console.log("Uploaded file:", uploadedFile);
      return uploadedFile;
   } catch (error) {
      console.log('Error uploading file:', error);
      throw new Error("File upload failed: " + error.message);
   }
}
export function getFilePreview(fileId) {
   try {
      const fileUrl = storage.getFilePreview(
         appwriteConfig.bannerStorage,
         fileId,
         2000,
         2000,
         ImageGravity.Top,
         50,
      );

      if (!fileUrl) throw Error;

      return fileUrl;
   } catch (error) {
      console.log(error);
   }
}
export async function deleteFile(fileId) {
   try {
      const deletedFile = await storage.deleteFile(
         appwriteConfig.bannerStorage,
         fileId,
      );
      return deletedFile;
   } catch (error) {
      console.log(error);
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
         [Query.equal('role', roles)] // Use array to match any of these roles
      );

      return clubMembers.documents;
   } catch (error) {
      console.error("Error fetching club members:", error);
   }
}
