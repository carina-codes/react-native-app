import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '674686ac0021f5a0627e',
  databaseId: '67468869003b62712896',
  userCollectionId: '674688a000184853454a',
  videoCollectionId: '674688c100105b484d8c',
  storageId: '67468b370005db760793'
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Function to create a user
export const createUser = async (email, password, username) => {
  try {
    // Create a new user account
    const newAccount = await account.create(ID.unique(), email, password, username);

    const avatarUrl = avatars.getInitials(username);

    // Add user to the database
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;

  } catch (error) {
    console.error("Error creating user:", {
      message: error.message,
      code: error.code,
    });
    throw new Error(error.message || 'Failed to create user.');
  }
};

// Function to sign in a user
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Error signing in:", {
      message: error.message,
      code: error.code,
    });
    throw new Error(error.message || 'Failed to sign in.');
  }
};

// Function for the global provider
export const getCurrentUser = async () => {
  try {
    // Get the current account
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw new Error('No user is logged in.');
    }

    // Query user details from the database
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser.documents.length) {
      throw new Error('User data not found in database.');
    }

    return currentUser.documents[0];
  } catch (error) {
    console.error("Error fetching current user:", {
      message: error.message,
      code: error.code,
    });
    return null;
  }
};

// Function to get all video posts
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// Function to get latest video posts
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt', Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}