<template>
  <div>
    <nav>
      <router-link to="/"> Notes </router-link> |
      <router-link to="register"> Register </router-link> |
      <router-link to="sign-in"> Log-in </router-link> |
      <button v-if ="isLoggedIn"  @click="handleLogOut">Log-out</button> |
    </nav>
    <router-view />
  </div>
</template>

<script setup>

import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router"
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
