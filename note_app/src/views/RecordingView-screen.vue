
<script>
import { storage } from "../main.js";
import { ref, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      title: null,
    };
  },
  async mounted() {
    // audio files handling
    const audioRef = ref(
      storage,
      "users/XWcmM6BwxxYhm3wJAHhq9bL2H2M2/recordings/sssssssssssss"
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

  methods: {},
};
</script>
 
<template>
  <div class="container">
      <h1>{{title}}</h1>
    <section class="main-controls">
      <div id="buttons"></div>
    </section>

    <section class="sound-clips"></section>
  </div>
</template>