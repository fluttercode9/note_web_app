<template>
  <div>
    <h1>Sign in</h1>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="register">Submit</button>
    <button @click="signInWithGoogle">Sign In With Google</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const email = ref(""); //https://compiletab.com/vue-get-input-value/#get-input-value-using-ref
const password = ref("");
const router = useRouter();
var errorMessage = ref();
const register = () => {
  const auth = getAuth(); // get auth from firebase/auth
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log("Succesfully logged in!");
      console.log(auth.currentUser); // <======== thats how u get curr user data
      router.push("/feed");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage.value = "Invalid Email";
          break;
        case "auth/wrong-password":
          errorMessage.value = "Invalid Email";
          break;
        case "auth/user-not-found":
          errorMessage.value = "Invalid Email";
          break;
        default:
            errorMessage.value = "Email or password was incorrect";
        
      }
    });
};

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then((result)=> {
        console.log(result.user);
        router.push("feed");
    })
    .catch((error) =>{
        console.log(error.code)
    })
};</script>
