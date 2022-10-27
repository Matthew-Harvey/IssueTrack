// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc7QGdtyyNCtDqcMGML0utjhWDbMIsThI",
  authDomain: "issuetrack-3695e.firebaseapp.com",
  projectId: "issuetrack-3695e",
  storageBucket: "issuetrack-3695e.appspot.com",
  messagingSenderId: "907002867239",
  appId: "1:907002867239:web:b4df243c9580500bc56802"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);