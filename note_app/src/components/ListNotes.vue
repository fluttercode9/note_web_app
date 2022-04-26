<script>
import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../main.js";
import {getAuth} from "firebase/auth";

export default {
    data() {
        return {
            notes: null
        }
    },
    async mounted() {
        const auth = getAuth();
        const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser.uid}/notes`));
        let notes_array = []
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            notes_array.push(doc)
        });
        this.notes = notes_array


    },
    methods : {
        first20: function(string){
            let split_string = string.split(' ');
            let result = split_string.slice(0, 20).join(' ')
            if (split_string.length > 20) {
                result = result + ' ...'
            }
            return result
        }
    }

}
</script>

<template>
    <div class="container-flex" v-if="notes">
        <div class="card mb-1" v-for="note in notes" :key="note.Title">
            <router-link :to = "{name:'note', params:{ id: note.id}}"> <div class="card-body" style="text-align: justify;text-justify: inter-word;">
                <h5 class="card-title">{{ note.data().Title }}</h5>
                <p style="color:grey;" class="card-text">{{ first20(note.data().Content)}}</p>
            </div></router-link>
        </div>
    </div>
</template>