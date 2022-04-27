
<script>
import { storage } from "../main.js";
import { ref, getDownloadURL, deleteObject} from "firebase/storage";
import {auth} from '../main.js'

export default {
  data() {
    return {
      rec: null,
      id: this.$route.params.id,
      uid: auth.currentUser.uid,
    };
  },
  async mounted() {
    // audio files handling
    const audioRef = ref(
      storage,
      `users/${this.uid}/recordings/${this.id}`
    );

    getDownloadURL(audioRef)
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        console.log("resp");
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = () => {
        const clipContainer = document.createElement("article");
          const blob = xhr.response;
          console.log(blob);
          const soundClips = document.querySelector(".sound-clips");
          soundClips.innerHTML = ""
          const audio = document.createElement("audio");
          audio.controls = true;
          clipContainer.classList.add("clip");
          audio.setAttribute("controls", "");
          clipContainer.appendChild(audio);
          soundClips.appendChild(clipContainer);
          const audioURL = window.URL.createObjectURL(blob);
          console.log(audioURL);
          audio.src = audioURL;
        };
        xhr.open("GET", url);
        xhr.send();

        // Or inserted into an <img> element
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    deleteRecording: function(){      
      const storageRef = ref(
              storage,
              `users/${auth.currentUser.uid}/recordings/${this.id}`
            );    
      deleteObject(storageRef);
      this.$router.push('/home')
    }
  },
};
</script>
 
<template>
  <div class="container">
      <h1>{{id}}</h1>
    <section class="main-controls">
      <div id="buttons"></div>
    </section>
    <button @click.prevent="deleteRecording" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
        <img style="width: 30px" src = "../assets/trash-bin.svg"/>
    </button>

    <section class="sound-clips"></section>
  </div>
</template>
