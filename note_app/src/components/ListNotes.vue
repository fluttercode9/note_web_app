<script>
import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../main.js";
import {getAuth} from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

export default {
    data() {
        return {
            notes: null,
            photo_notes: null
        }
    },
    async created() {
        const auth = getAuth();
        const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser.uid}/notes`));
        const notes_array = [];

        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            notes_array.push(doc)
        });
        this.notes = notes_array
        const photo_notes_array = [];
        const storage = getStorage();
        const listRef = ref(storage, `users/${auth.currentUser.uid}/photos`);
        const storageSnapshot = await listAll(listRef);
        storageSnapshot.items.forEach((itemRef) => {
            getDownloadURL(ref(storage, itemRef._location.path_)).then((file_url) => {
                const file_object = {
                    name: itemRef.name,
                    url: file_url
                }
                photo_notes_array.push(file_object);
            })

        })
        this.photo_notes = photo_notes_array;
        console.log(photo_notes_array)
        console.log(this.photo_notes.length)






    },
    methods: {
        first20: function (string) {
            let split_string = string.split(' ');
            let result = split_string.slice(0, 20).join(' ')
            if (split_string.length > 20) {
                result = result + ' ...'
            }
            return result
        },

    }

}
</script>

<template>
    <div>
        <div class="container-flex" v-if="notes">
            <div class="card mb-1" v-for="note in notes" :key="note.Title">
                <router-link :to="{name:'note', params:{ id: note.id}}">
                    <div class="card-body" style="text-align: justify;text-justify: inter-word;">
                        <h5 class="card-title">{{ note.data().Title }}</h5>
                        <p style="color:grey;" class="card-text">{{ first20(note.data().Content)}}</p>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="container-flex" v-if="photo_notes">
            <div class="card mb-1" v-for="photo_note in photo_notes" :key="photo_note.title">
                <div>
                    <h5 class="card-title">{{ photo_note.title }}</h5>
                    <img src="{{ photo_note.url }}">
                </div>
            </div>
        </div>
    </div>
</template>