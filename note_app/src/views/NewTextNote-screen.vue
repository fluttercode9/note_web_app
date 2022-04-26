<template>
    <div>
        <p>Enter your note</p>
        <textarea style="width: 65%; height: 5vh" v-model="noteContent" class="noteContent">
        </textarea>
        
        <br/>
        <button @click="testujemy" style="color: transparent; background-color: transparent; border-color: transparent">
            <img style="width: 30px" src = "../assets/save-icon.svg"/>
        </button>
        
    </div>
</template>
<script>

</script>