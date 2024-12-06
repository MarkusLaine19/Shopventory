import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from './toast';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8Ya-Z55XPZ_iIQBhdAZbFvz6DQYZBlJM",
  authDomain: "shopventory-84d92.firebaseapp.com",
  projectId: "shopventory-84d92",
  storageBucket: "shopventory-84d92.firebasestorage.app",
  messagingSenderId: "520070728307",
  appId: "1:520070728307:web:4fbf6f2dfa7510b5d1f806",
  measurementId: "G-BH5TN8ENJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore database
export { db };

// Function to log in the user
export async function loginUser(username: string, password: string): Promise<boolean> {
  const email = `${username}@codedamn.com`;
  try {
    const auth = getAuth();
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", res);
    return true;
  } catch (error: any) {
    toast(error.message, 4000);
    return false;
  }
}

// Function to register a new user
export async function registerUser(username: string, password: string): Promise<boolean> {
  const email = `${username}@codedamn.com`;
  try {
    const auth = getAuth();
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const uid = res.user.uid;

    // Create user document
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, {
      createdAt: new Date(),
      username: username
    });


    

    // Create additional lists (Shopping and Inventory)

    console.log("User registered:", res);
    return true;
  } catch (error: any) {
    console.error("Error during user registration:", error);
    toast(error.message, 4000);
    return false;
  }
}
