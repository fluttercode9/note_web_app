
<script>
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../main.js";

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
        this.title = docSnap.data().Title
        this.content = docSnap.data().Content

    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  },

  methods: {},
};
</script>
 
<template>
  <div class="container">
    <h1>Note id: {{ id }}:</h1>
    <h1>Note title: {{ title}}</h1>
    <h2>Content: {{content}}</h2>
  </div>
</template>