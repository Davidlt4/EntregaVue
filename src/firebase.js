import { initializeApp } from '@firebase/app'
import { getFirestore, collection } from '@firebase/firestore'
import { getAuth } from "@firebase/auth"
import { getStorage } from "firebase/storage";
// ... other firebase imports

export const firebaseApp = initializeApp({
  // your application settings
  apiKey: "AIzaSyAqrFZ49K5TCegbHEBbMK2aL0Ku8jD82mI",
  authDomain: "entregavue.firebaseapp.com",
  projectId: "entregavue",
  storageBucket: "entregavue.appspot.com",
  messagingSenderId: "232532919948",
  appId: "1:232532919948:web:b5407f792e39e4269b9da9"
})

// used for the firestore refs
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp);