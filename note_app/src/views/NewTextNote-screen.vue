<template>
    <div class ='container'>
        <p>Enter your note</p>
        <form class = 'row mb-3'>
            <input style="width: 90%%; height: 5vh" class="form-control row mb-3" v-model="noteTitle" type="text" placeholder="Title" required>
            <br>
            <textarea style="width: 100%; height: 200px" v-model="noteContent" class="row mb-3 noteContent form-control" placeholder="Text" required>
            </textarea>
        
            <br>            
            <button @click.prevent="addTextNote" style="color: transparent; background-color: transparent; border-color: transparent" type="submit">
            <img style="width: 30px" src = "../assets/save-icon.svg"/>
            </button>
        </form>
        
    </div>
</template>
<script>
import {getAuth} from "firebase/auth";
import {db} from "../main.js";
import {addDoc, collection} from "firebase/firestore";
export default {
    methods: {
        addTextNote: function () {            
            if (this.noteTitle.length > 0 && this.noteContent.length > 0) {                
                const auth = getAuth();
                console.log(auth.currentUser.uid);
                //console.log(auth.uid)
                var dateOfCreation = new Date();
                //var dateAndTime = dateOfCreation.getFullYear() + dateOfCreation.getMonth() + dateOfCreation.getDate() + ' ' + dateOfCreation.getHours() + dateOfCreation.getMinutes() + dateOfCreation.getSeconds()
                console.log(dateOfCreation)
                //console.log(dateAndTime)
                addDoc(collection(db, `users/${auth.currentUser.uid}/notes`), {
                    Title: this.noteTitle,
                    Content: this.noteContent,
                    Date: dateOfCreation                     
                });
                this.$router.push('/home')                
            }
            
        }
    }
}
</script>