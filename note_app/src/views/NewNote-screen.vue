<template>
    <div class ='row mb-3'>
        
        <router-link class="nav-link  mb-3" to="add-text-note" active-class="active">    
            <img style="width: 30px" src = "../assets/text-icon.svg"/>
            <p style="display:inline">Text</p>
        </router-link>
        <br/>
        <router-link class="nav-link  mb-3" to="create-photo" active-class="active">    
            <img style="width: 30px" src = "../assets/camera-icon.svg"/>
            <p style="display:inline">Photo</p>
        </router-link>
        <br>
        <router-link class="nav-link  mb-3" to="create-voice" active-class="active">    
            <img style="width: 30px" src = "../assets/microphone.svg"/>
            <p style="display:inline">Recording</p>
        </router-link>
        <br/>        
        
        
    </div>

</template>