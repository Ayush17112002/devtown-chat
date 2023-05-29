import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDGn1Lmjk42uV3LqA7ktSpRoEi_yq8JGR8",
  authDomain: "devtown-chat.firebaseapp.com",
  projectId: "devtown-chat",
  storageBucket: "devtown-chat.appspot.com",
  messagingSenderId: "875461428380",
  appId: "1:875461428380:web:27b790e357abef89475959",
  measurementId: "G-HBDV3RJ9BB",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
