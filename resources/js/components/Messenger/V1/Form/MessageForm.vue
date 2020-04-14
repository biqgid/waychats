<template>
    <form class="message-form-wrapper w-100 position-relative" v-on:submit.prevent>
        <emoji-textarea
            :value="content"
            @input="onInput"
            ref="textarea"></emoji-textarea>


        <v-btn
            dark
            fab
            icon
            color="#05637c"
            class="message-file-menu"
            @click=""
        >
            <i class="material-icons">
                attachment
            </i>
        </v-btn>

        <v-btn
            dark
            fab
            icon
            color="#05637c"
            class="message-send-btn"
            @click="getAction"
        >
            <i class="material-icons change-icon">
                {{ icon }}
            </i>
        </v-btn>
    </form>
</template>
<script>
    import Textarea from 'emoji-vue';
    import Message from '../../../../app/Messages/Message';
    import Event from '../../../../app/Events/Event';
    import $ from 'jquery';

    export default {
        name: "MessageForm",
        data(){
            return {
                content: null,
                icon: 'mic',
                isRecording: false,
                audioRecorder: null,
                recordingData: [],
                dataUrl: '',

                counter: 0,
            }
        },
        methods: {
            onInput(event) {
                this.content = event.data;
            },
            send() {
                console.log('send')
                /*if (this.content) {
                    this.$emit('send', this.content)
                }else
                    return false;*/

                /*if (this.icon === 'send') {
                    if (this.content) {
                        this.$emit('send', {
                            content: this.content,
                        })
                    }else
                        return false;
                } else {

                }*/
            },
            record() {
                console.log('record')
            },

            getAction() {
                if (this.content) {
                    this.$emit('send', this.content)
                }else
                    return false;
            },

            voicePlay() {
                if (this.hasMediaDevices()) {
                    navigator.mediaDevices.getUserMedia(audioConstraints).then(this.successCallBack, this.errorCallBack);
                }
            },

            hasMediaDevices() {
                return !!navigator.mediaDevices.getUserMedia;
            },

            successCallBack() {
                recordButton.onclick = function() {
                    console.log('Record pressed');
                    mediaRecorder.start();
                    console.log(mediaRecorder.state);
                }

            },

            toggleRecording: function() {
                var that = this;
                this.isRecording = !this.isRecording;
                if (this.isRecording) {
                    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;
                    navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: false
                    }, function(stream) {
                        that.stream = stream;
                        that.audioRecorder = new MediaRecorder(stream, {
                            mimeType: 'audio/ogg',
                            audioBitsPerSecond : 96000
                        });
                        that.audioRecorder.start();
                        console.log('Media recorder started');
                    }, function(error) {
                        alert(JSON.stringify(error));
                    });
                }
                else {
                    this.audioRecorder.stop();
                }
            },

        },
        components: {
            'emoji-textarea' : Textarea,
        },
        mounted() {
            Event.$on('clearForm', () => {
                this.content = '';
            });

            $('.emoji-vue-wraper').keyup(function (e) {
                if (e.target.innerText) {
                    this.icon = 'send';
                    $('.change-icon').text('send');
                } else {
                    $('.change-icon').text('mic');
                    this.icon = 'send';
                }
            });

            /*this.audioRecorder.ondataavailable = function(event) {
                that.recordingData.push(event.data);
            };

            this.audioRecorder.onstop = function(event) {
                console.log('Media recorder stopped');
                var blob = new Blob(that.recordingData, { type: 'audio/ogg'});
                that.dataUrl = window.URL.createObjectURL(blob);
            }*/
        }
    }
</script>

<style scoped>
    .message-form-wrapper {
        overflow: hidden;
        border: 1px solid white;
        border-radius: 100px;
    }
    .message-send-btn {
        position: absolute;
        top: 0px;
        right: -1px;
        bottom: 0;
        height: 50px;
        width: 50px;
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        border: 1px solid white !important;
    }

    /* This is for documentation purposes and will not be needed in your application */
    #create .v-speed-dial {
        position: absolute;
    }

    #create .v-btn--floating {
        position: relative;
    }
</style>
