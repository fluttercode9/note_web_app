<template>
  <div>
    <h1>Register</h1>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="register">Submit</button>
    <button @click="signInWithGoogle">Register With Google</button>
  </div>
</template>

<script setup>
import { db } from "../main.js";
import { doc, setDoc } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
const email = ref(""); //https://compiletab.com/vue-get-input-value/#get-input-value-using-ref
const password = ref("");
const router = useRouter();
const register = () => {
  const auth = getAuth(); // get auth from firebase/auth
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((cred) => {
      console.log("Succesfully registered!");
      console.log(auth.currentUser); // <======== thats how u get curr user data
      router.push("/feed");
      console.log(cred.user.uid);
      setDoc(doc(db, "users", cred.user.uid), {
        name: auth.currentUser.email,
      });
      router.push("/home");
      // db.collection('users').doc(cred.user.uid).collection('notes');
      // collection(currentUserDoc, 'notes')
      // return collection(db, 'users').doc(cred.user.uid)
    })
    .catch((error) => console.log(error.code));

};
  const auth = getAuth(); // get auth from firebase/auth

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      setDoc(doc(db, "users", result.user.uid), {
        name: auth.currentUser.email,
      });
      router.push("/home");     

    })
    .catch((error) => {
      console.log(error.code);
    });
};
</script>
