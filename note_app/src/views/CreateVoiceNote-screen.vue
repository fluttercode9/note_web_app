<template>
  <div class="container">
    <br><br><br>
    <section class="main-controls">
      <div id="buttons">
        <button class="record">Record</button>
        <button class="stop">Stop</button>
      </div>
    </section>

    <section class="sound-clips"></section>
  </div>
</template>

<script>
import { ref, uploadBytes } from "firebase/storage";
import { storage, auth } from "../main.js";


export default {
  data() {
    return {};
  },
  async mounted() {
    const record = document.querySelector(".record");
    const stop = document.querySelector(".stop");
    const soundClips = document.querySelector(".sound-clips");

    // disable stop button while not recording

    stop.disabled = true;

    //main block for doing the audio recording

    if (navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");

      const constraints = { audio: true };
      let chunks = [];

      let onSuccess = function (stream) {
        const mediaRecorder = new MediaRecorder(stream);

        record.onclick = function () {
          soundClips.innerHTML = "";
          mediaRecorder.start();
          console.log(mediaRecorder.state);
          console.log("recorder started");
          record.style.background = "red";

          stop.disabled = false;
          record.disabled = true;
        };

        stop.onclick = function () {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
          console.log("recorder stopped");
          record.style.background = "";
          record.style.color = "";
          // mediaRecorder.requestData();

          stop.disabled = true;
          record.disabled = false;
        };

        mediaRecorder.onstop = function () {
          console.log("data available after MediaRecorder.stop() called.");

          const clipName = prompt(
            "Enter a name for your sound clip?",
            "My unnamed clip"
          );

          const clipContainer = document.createElement("article");
          const clipLabel = document.createElement("p");
          const audio = document.createElement("audio");
          const deleteButton = document.createElement("button");
          const saveButton = document.createElement("button");

          clipContainer.classList.add("clip");
          audio.setAttribute("controls", "");
          deleteButton.textContent = "Delete";
          deleteButton.className = "delete";
          saveButton.textContent = "Save";
          saveButton.className = "save";

          if (clipName === null) {
            clipLabel.textContent = "My unnamed clip";
          } else {
            clipLabel.textContent = clipName;
          }

          clipContainer.appendChild(audio);
          clipContainer.appendChild(clipLabel);
          clipContainer.appendChild(deleteButton);
          clipContainer.appendChild(saveButton);
          soundClips.appendChild(clipContainer);

          audio.controls = true;
          const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
          chunks = [];
          console.log(blob);
          const audioURL = window.URL.createObjectURL(blob);
          audio.src = audioURL;
          console.log("recorder stopped");

          deleteButton.onclick = function (e) {
            let evtTgt = e.target;
            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
          };
          saveButton.onclick = function () {
            const storageRef = ref(
              storage,
              `users/${auth.currentUser.uid}/recordings/${clipName}`
            );
            uploadBytes(storageRef, blob).then(() => {
              console.log("uploaded blob file!");              
            });
          };

          clipLabel.onclick = function () {
            const existingName = clipLabel.textContent;
            const newClipName = prompt("Enter a new name for your sound clip?");
            if (newClipName === null) {
              clipLabel.textContent = existingName;
            } else {
              clipLabel.textContent = newClipName;
            }
          };
        };

        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };
      };

      let onError = function (err) {
        console.log("The following error occured: " + err);
      };

      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  },

  methods: {},
};
</script>




  

 
