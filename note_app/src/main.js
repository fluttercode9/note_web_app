import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css';
import router from './router'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
  // Import the functions you need from the SDKs you need

//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//const analytics = getAnalytics(app);


const firebaseConfig = {
  apiKey: "AIzaSyB8wFkPpHdgjMvxfDSUnPCGCCd70SEkhLI",
  authDomain: "noteapp-e0682.firebaseapp.com",
  projectId: "noteapp-e0682",
  storageBucket: "noteapp-e0682.appspot.com",
  messagingSenderId: "460976370261",
  appId: "1:460976370261:web:3e4d795ffca9d9f3011adc",
  measurementId: "G-7CF54EZ72R"
};
const firebase_app = initializeApp(firebaseConfig);

export const db = getFirestore(firebase_app)

const app = createApp(App)
app.use(router)
app.mount('#app')



// export function getNotes(){
//   getDocs(collection(db, "test-notes-collection")).then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data().Title}`);
//     })}
//   );
// } 

