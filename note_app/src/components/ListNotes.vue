<script>
import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../main.js";
export default {
    data() {
        return {
            notes: null
        }
    },
    async mounted() {
        const querySnapshot = await getDocs(collection(db, "test-notes-collection"));
        let notes_array = []
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            notes_array.push(doc.data())
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
            <div class="card-body" style="text-align: justify;text-justify: inter-word;">
                <h5 class="card-title">{{ note.Title }}</h5>
                <p style="color:grey;" class="card-text">{{ first20(note.Content)}}</p>
            </div>
        </div>
    </div>
</template>