// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8wFkPpHdgjMvxfDSUnPCGCCd70SEkhLI",
  authDomain: "noteapp-e0682.firebaseapp.com",
  projectId: "noteapp-e0682",
  storageBucket: "noteapp-e0682.appspot.com",
  messagingSenderId: "460976370261",
  appId: "1:460976370261:web:3e4d795ffca9d9f3011adc",
  measurementId: "G-7CF54EZ72R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app)


export { auth, db } 