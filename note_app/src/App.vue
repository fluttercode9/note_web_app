<template>
  <div class="container">
    <div class="row position-absolute top-0 ms-2 mt-2">
      <div class="col col-title">
        <img style="height:40px"  src = "./assets/note.svg" alt="NoteAppLogo"/>
      </div>
      <div class="col col-title">
        <p class="app-name">NoteApp</p>
      </div>
    </div>
    <ul class="nav nav-pills nav-fill mb-5">
      <li class="nav-item">
        <router-link class="nav-link nav-custom" to="home" active-class="active">Notes</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="register" active-class="active">Register</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="sign-in" active-class="active">Log-in</router-link>
      </li>
      <li v-if ="isLoggedIn" class="nav-item">
        <button class="nav-link"   @click="handleLogOut">Log-out</button>
      </li>
    </ul>
    <router-view />
  </div>
</template>



<script setup>

import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";






const isLoggedIn = ref(false);
const router = useRouter();
let auth ;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
// eslint-disable-next-line no-unused-vars
const handleLogOut = () => {
  signOut(auth).then(() => {
    router.push("sign-in");
  });
};


</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
