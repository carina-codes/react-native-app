import { 
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Storage,
} from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.carinacodes.aora',
  projectId: '674686ac0021f5a0627e',
  databaseId: '67468869003b62712896',
  userCollectionId: '674688a000184853454a',
  videoCollectionId: '674688c100105b484d8c',
  storageId: '67468b370005db760793'
};

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Function to create a user
export const createUser = async (email, password, username) => {
  try {
    // Create a new user account
    const newAccount = await account.create(ID.unique(), email, password, username);

    const avatarUrl = avatars.getInitials(username);

    // Add user to database
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
    console.error("Error creating user:", error);
    throw new Error(error.message || 'Failed to create user.');
  }
};

// Function to sign in a user
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error(error.message || 'Failed to sign in.');
  }
};
