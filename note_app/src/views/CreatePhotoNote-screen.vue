<template>
    <div class="mx-auto" style="max-width: 500px">
        <br><br><br>
        <form @submit.prevent="uploadPhoto">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Title</label>
                <input name="title"  type="text" class="form-control" id="exampleFormControlInput1" placeholder="MyPhotoNote">
            </div>

            <div class="mb-3 row">
                <label class="btn btn-add-photo ">
                    <i class="bi bi-camera"></i> Add photo<input @change="checkIfPhotoUploaded()"
                        onchange="document.getElementById('photo').src = window.URL.createObjectURL(this.files[0])"
                        type="file" style="display: none;" id="photo-upload" name="image" accept="image/*">
                </label>


            </div>
            <div v-if="photoUploaded" class="row mb-3">
                <button type="submit" 
                    style="color: transparent; background-color: transparent; border-color: transparent">
                    <img style="width: 30px" src="../assets/save-icon.svg" />
                </button>
            </div>
            <div v-if="photoUploaded">
                <img class="img-fluid img-thumbnail" id="photo" />
            </div>


        </form>

    </div>
</template>
<script>
    import { nextTick } from 'vue';
    import { getStorage, ref, uploadBytes } from "firebase/storage";
    import {getAuth} from "firebase/auth";
    import router from '../router'
    
    export default {
        data() {
            return {
                photoUploaded: false
            }
        },
        methods: {
            async checkIfPhotoUploaded() {
                await nextTick()
                this.photoUploaded = document.getElementById("photo-upload").files.length != 0
            },

            uploadPhoto(submitEvent) {             
                const storage = getStorage();
                const auth = getAuth();
                const file = document.getElementById("photo-upload").files[0];
                const fileRef = ref(storage, `users/${auth.currentUser.uid}/photos/${submitEvent.target.elements.title.value}`);
                uploadBytes(fileRef, file).then(() => {
                  console.log('Uploaded a blob or file!');
                  router.push({ path:"/home" });
                });

            }
        }
    }
</script>