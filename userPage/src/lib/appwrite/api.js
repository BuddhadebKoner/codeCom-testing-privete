import { ID, ImageGravity, Query } from "appwrite";
import { account, appwriteConfig, avatar, database, storage } from "./config";

export async function createUserAccount(user) {
   try {
      const newAcount = await account.create(
         ID.unique(),
         user.email,
         user.password,
         user.name
      );
      if (!newAcount) throw new Error("Account creation failed");

      const imageUrl = avatar.getInitials(user.name);

      const newUser = await saveUserToDatabase({
         userId: newAcount.$id,
         email: newAcount.email,
         name: newAcount.name,
         imageUrl: imageUrl,
      });
      return newUser;
   } catch (error) {
      console.error("Error during account creation:", error);
      throw error;
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
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
         console.log("User already signed in");
         return currentAccount;
      }

      const session = await account.createEmailPasswordSession(
         user.email,
         user.password
      );

      // console.log("New session created:", session);
      return session;
   } catch (error) {
      console.error("Error in signInUser:", error);

      throw error;
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
            Query.equal("IsShowingInHomePage", true),
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
      const isRegistrationOpen = Date.now() < new Date(passData?.registerationEndsAt).getTime();
      if (!isRegistrationOpen) {
         return "Unauthorized activity"
      }
      const entryId = ID.unique();
      // push entry id to passData

      const entryPassData = {
         entryId,
         users: passData.users,
         events: passData.events,
         purpose: passData.purpose,
         stream: passData.stream,
         department: passData.department,
         phone: passData.phone,
         institute: passData.institute,
         year: passData.year,
         specialization: passData.specialization,
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
      return error.message;
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
   const queries = [
      Query.orderDesc('$updatedAt'), Query.limit(10),
      Query.equal('isActive', true)
   ];
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

// upload file 
export async function uploadfile(file) {
   console.log("File to upload:", file);
   try {
      if (!file) throw ("file not provided");

      const uploadFile = await storage.createFile(
         appwriteConfig.profileStorage,
         ID.unique(),
         file,
      )

      console.log("File uploaded:", uploadFile);
      return uploadFile;
   } catch (error) {
      console.error("Error uploading file:", error);
   }
}

// preview file 
export async function getFilePreview(fileId) {
   try {
      const fileUrl = storage.getFilePreview(
         appwriteConfig.profileStorage,
         fileId,
         2000,
         2000,
         ImageGravity.Top,
         50,
      );

      if (!fileUrl) throw ("File not found");
      return fileUrl;
   } catch (error) {
      console.error("Error fetching file preview:", error);
   }
}
// delete file
export async function deleteFile(fileId) {
   try {
      const deleteFile = await storage.deleteFile(
         appwriteConfig.profileStorage,
         fileId
      );

      console.log("File deleted:", deleteFile);
      return deleteFile;
   } catch (error) {
      console.error("Error deleting file:", error);
   }
}

export async function getUpdateUserProfile(user) {
   // console.log("User to update:", user);
   const hasFileToUpdate = user.imageFile && user.imageFile.size > 0;

   try {
      let image = {
         imageUrl: user.imageUrl,
         imageId: user.imageId,
      };

      // Handle file upload if a new file is provided
      if (hasFileToUpdate) {
         const uploadFile = await uploadfile(user.imageFile);
         if (!uploadFile) throw new Error("Failed to upload file.");

         const fileUrl = await getFilePreview(uploadFile.$id);
         if (!fileUrl) {
            await deleteFile(uploadFile.$id);
            throw new Error("Failed to generate file preview URL.");
         }

         image = { imageUrl: fileUrl, imageId: uploadFile.$id };
      }

      // Patch request for updating the user profile
      const updatedUser = await database.updateDocument(
         appwriteConfig.databaseId,
         appwriteConfig.userCollectionId,
         user.userId, // Document ID to update
         {
            name: user.name,
            city: user.city,
            linkedin: user.linkedin,
            x: user.x,
            aboutMe: user.aboutMe,
            imageUrl: image.imageUrl,
            imageId: image.imageId,
         }
      );

      if (!updatedUser) {
         if (hasFileToUpdate) {
            await deleteFile(image.imageId);
         }
         throw new Error("Failed to update user profile.");
      }

      // Delete old file if a new one was uploaded
      if (hasFileToUpdate && user.imageId) {
         await deleteFile(user.imageId);
      }

      return updatedUser;
   } catch (error) {
      console.error("Error updating user profile:", error.message);
      throw error; // Ensure the error propagates for the UI to handle
   }
}

// search events
export async function searchEvents(searchTerm) {
   try {
      const events = await database.listDocuments(
         appwriteConfig.databaseId,
         appwriteConfig.eventCollectionId,
         [
            Query.equal('isActive', true),
            Query.search('title', searchTerm),
            Query.limit(10)
         ]
      );

      if (!events) throw new Error("No events found.");
      return events;
   } catch (error) {
      console.error("Error while searching events:", error);
   }
}
