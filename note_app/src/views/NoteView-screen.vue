
<script>
import { doc, getDoc } from "firebase/firestore";
import { db, auth, storage } from "../main.js";
import {  ref, getDownloadURL  } from "firebase/storage";


export default {
  data() {
    return {
      note: null,
      id: this.$route.params.id,
      auth: auth,
      uid: auth.currentUser.uid,
      title: null,
      content: null,
    };
  },
  async mounted() {
    const docRef = doc(db, "users", `${this.uid}`, "notes", `${this.id}`);
    const docSnap = await getDoc(docRef);

    // this.note =  docSnap;

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.title = docSnap.data().Title;
      this.content = docSnap.data().Content;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    // audio files handling
    const audioRef = ref(
      storage,
      "users/XWcmM6BwxxYhm3wJAHhq9bL2H2M2/recordings/sssssssssssss"
    );
    // console.log(audioRef.name);
    // const blob = getBlob(audioRef)
    // console.log(blob)
    getDownloadURL(audioRef)
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        (console.log('resp'))
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = () => {
            console.log('hej')
          const blob = xhr.response;
          console.log(blob)
        };
        xhr.open("GET", url);
        xhr.send();

        // Or inserted into an <img> element
        
      })
      .catch((error) => {
        console.log(error)
      });
  },

  methods: {},
};
</script>
 
<template>
  <div class="container">
    <h1>Note id: {{ id }}:</h1>
    <h1>Note title: {{ title }}</h1>
    <h2>Content: {{ content }}</h2>
  </div>
</template>