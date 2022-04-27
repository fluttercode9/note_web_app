<script>
import { collection, getDocs } from "firebase/firestore"; 
import {db} from "../main.js";
import {getAuth} from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";


export default {
    data() {
        return {
            text_notes: [],
            photo_notes: [],
            recording_notes: []
        }
    },
    async mounted() {
        const auth = getAuth();

        const querySnapshot = await getDocs(collection(db, `users/${auth.currentUser.uid}/notes`));

        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            this.text_notes.push(doc)
        });
        const storage = getStorage();
        const photoListRef = ref(storage, `users/${auth.currentUser.uid}/photos`);
        const photoStorageSnapshot = await listAll(photoListRef);
        photoStorageSnapshot.items.forEach((itemRef) => {
            getDownloadURL(ref(storage, itemRef._location.path_)).then((file_url) => {
                console.log(`item: ${itemRef.name}, url: ${file_url}`);
                const file_object = {
                    title: itemRef.name,
                    url: file_url
                };
                this.photo_notes.push(file_object);
            })

        })
        const recordingListRef = ref(storage, `users/${auth.currentUser.uid}/recordings`);
        const recordingStorageSnapshot = await listAll(recordingListRef);
        recordingStorageSnapshot.items.forEach((itemRef) => {
            getDownloadURL(ref(storage, itemRef._location.path_)).then((file_url) => {
                console.log(`item: ${itemRef.name}, url: ${file_url}`);
                const file_object = {
                    title: itemRef.name,
                    url: file_url
                };
                this.recording_notes.push(file_object);
            })

        })


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
    <div class="mx-auto" >
        <div class="container-flex" v-if="text_notes">
            <TransitionGroup name="list">
            <div class="card mb-1" v-for="note in text_notes" :key="note.data().Title">
                <router-link :to="{name:'note', params:{ id: note.id}}">
                    <div class="card-body" style="text-align: justify;text-justify: inter-word;">
                        <h5 class="card-title">{{ note.data().Title }}</h5>
                        <p style="color:grey;" class="card-text">{{ first20(note.data().Content)}}</p>
                    </div>
                </router-link>
            </div>
            </TransitionGroup>
        </div>
        <div class="container-flex" v-if="photo_notes">
            <TransitionGroup name="list">
            <div class="card mb-1" v-for="photo_note in photo_notes" :key="photo_note.title">
                <router-link :to="{name:'note', params:{ id: photo_note.title, url: photo_note.url}}">
                <div class="card-body" style="text-align: justify;text-justify: inter-word;">
                    <h5 class="card-title">{{ photo_note.title }}</h5>
                    <img style="max-width:100px" class="img-thumbnail" v-bind:src="photo_note.url">
                </div>
                </router-link>
            </div>
            </TransitionGroup>

        </div>
        <div class="container-flex" v-if="recording_notes">
            <TransitionGroup name="list">
            <div class="card mb-1" v-for="recording_note in recording_notes" :key="recording_note.title">
                <div class="card-body" style="text-align: justify;text-justify: inter-word;">
                    <h5 class="card-title">{{ recording_note.title }}</h5>
                    <i class="bi bi-soundwave" style="font-size: 2em"></i>
                </div>
            </div>
            </TransitionGroup>
        </div>
    </div>
</template>

