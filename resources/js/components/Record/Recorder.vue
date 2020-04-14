<template>
    <div class="content">
           <!--<h4>Web Audio Recorder</h4>
           <hr>
        <v-btn id="record" class="red" @click="record">record</v-btn>
        <v-btn id="play" class="blue" @click="play" ref="play">play</v-btn>
        -->

        <v-btn id="start" class="red" v-on:click.stop.prevent="recordStart">
            <v-icon>mic</v-icon>
            Start recording
        </v-btn>

        <v-btn id="stop" class="red" v-on:click.stop.prevent="recordStop">
            <v-icon>pause</v-icon>
            Stop recording
        </v-btn>

        <v-btn id="play" class="green"  v-on:click.stop.prevent="togglePlay">
            <v-icon>play_arrow</v-icon>
            Play recording
        </v-btn>

        <v-btn id="delete" class="blue" v-if="chunks.length" v-on:click.stop.prevent="removeRecording">
            <v-icon>delete_outline</v-icon>
            Delete recording
        </v-btn>

        <v-btn id="send" class="green" @click="submitRecording">
            <v-icon>send</v-icon>
            Send recording
        </v-btn>

        <audio id="audio" preload="auto" v-model="chunks" controls></audio>
        <input type="file" accept="audio/*;capture=microphone">

        <!--<button class="button red-button">
            <i class="record icon"></i> Start / Stop recording
        </button>
        <button class="button green-button">
            <i class="play icon"></i> Play recording
        </button>
        <button class="remove-recording">
            <i class="remove icon"></i> Delete recording
        </button>
        <button class="button green-button">
            <i class="send icon"></i> Send recording
        </button>
        -->
    </div>
</template>

<script>
    export default {
        name: "Recorder",

        data() {
            return {
                audio: new Audio(),
                audioContext: window.AudioContext || webKit.AudioContext,
                audioCtx: new AudioContext(),

                audioConstraints: {audio: true, video: false},
                chunks: [],

                isRecording: false,
                audioRecorder: null,
                recordingData: [],
                dataUrl: ''
            }
        },

        mounted() {
        },

        methods: {

            recordStart() {
                let self = this;
                this.isRecording = !this.isRecording;

                if (this.isRecording) {

                    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia
                        || navigator.mediaDevices.webkitGetUserMedia
                        || navigator.mediaDevices.mozGetUserMedia;

                    navigator.mediaDevices.getUserMedia(this.audioConstraints).then(stream => {

                        this.stream = stream;

                        this.audioRecorder = new MediaRecorder(stream);

                        this.audioRecorder.start();
                        console.log('Media recorder started');


                    }, error => {
                        alert(JSON.stringify(error));
                    })
                }
            },

            recordStop() {
                let self = this;

                this.audioRecorder.stop();

                this.audioRecorder.ondataavailable = function(event) {
                   self.chunks.push(event.data);
                };

                this.audioRecorder.onstop = function(event) {
                    let blob = new Blob(self.chunks, { 'type' : 'audio/ogg; codecs=opus' });
                    self.chunks = [];
                    const audioURL = window.URL.createObjectURL(blob);
                    self.audio.src = audioURL;
                };
            },



            togglePlay: function() {
                this.audio.play()
            },


            submitRecording: function() {
                let that = this;
                let blob = new Blob(that.recordingData , { type: 'audio/ogg'});
                let formData = new FormData();
                formData.append('recording', blob);
                axios.post('api/recordings', formData);
            }
        }
    }
</script>

<style scoped>

</style>
