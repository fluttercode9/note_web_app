<template>
  <div>
    <h1>Register</h1>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="register">Submit</button>
    <button @click="signInWithGoogle">Sign In With Google</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
const email = ref(""); //https://compiletab.com/vue-get-input-value/#get-input-value-using-ref
const password = ref("");
const router = useRouter();
const register = () => {
    const auth = getAuth() // get auth from firebase/auth
  createUserWithEmailAndPassword(auth, email.value, password.value).then(
    () => {
      console.log("Succesfully registered!");
      console.log(auth.currentUser);// <======== thats how u get curr user data 
      router.push('/feed');
    }
  ).catch((error)=> console.log(error.code));
};

const signInWithGoogle = () => {};
</script>
