import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase

const firebaseConfig = {
    apiKey: "AIzaSyCcr0UaYWE6BxU3LDU_DS775S6SZ-5FFiU",
    authDomain: "rit-plus.firebaseapp.com",
    projectId: "rit-plus",
    storageBucket: "rit-plus.appspot.com",
    messagingSenderId: "337585281431",
    appId: "1:337585281431:web:16a3dc59ca709d032b0cd2",
    measurementId: "G-7GWZZ58YZ7"
  };

export const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
export const storage = getStorage(app);
/*
1. Add database rules to secure your data
*/