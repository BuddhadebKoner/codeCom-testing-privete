import {
   Client,
   Account,
   Databases,
   Storage,
   Avatars
} from 'appwrite';

export const appwriteConfig = {
   // project
   projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
   url: import.meta.env.VITE_APPWRITE_ENDPOINT,
   // buckets
   bannerStorage: import.meta.env.VITE_APPWRITE_EVENT_BANNER_STORAGE_ID,
   // collections
   databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
   userCollectionId: import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
   eventCollectionId: import.meta.env.VITE_APPWRITE_EVENT_COLLECTION_ID,
};

export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);


export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);