<template>
    <div>
        <h2> Add a new note:</h2>
        <router-link class="nav-link" to="add-text-note" active-class="active">    
            <img style="width: 30px" src = "../assets/text-icon.svg"/>
            <p style="display:inline">Text</p>
        </router-link>
        <br/>
        <router-link class="nav-link" to="create-voice" active-class="active">    
        <img style="width: 30px" src = "../assets/microphone.svg"/>
            <p style="display:inline">Recording</p>
        </router-link>
        <br/>
        <img style="width: 30px" src = "../assets/camera-icon.svg"/>
        <p style="display:inline">Photo</p>
        <br/>

        
    </div>

</template>