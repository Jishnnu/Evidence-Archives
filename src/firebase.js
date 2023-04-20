// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase Configuration
const firebaseConfig = {
    apiKey: "Your_API_Key",
    authDomain: "Your_Authorized_Domain",
    projectId: "Your_Project_ID",
    storageBucket: "Your_Storage_Bucket",
    messagingSenderId: "Your_Messaging_Sender_ID",
    appId: "Your_Application_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);