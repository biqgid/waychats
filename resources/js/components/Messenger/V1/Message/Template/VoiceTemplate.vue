<template>
    <li class="item-message voice-message">
        <div class="message-wrapper">
            <div class="header">
                <div class="userInfo">
                    <span class="user-image"><v-icon large>account_circle</v-icon></span>
                    <span class="user-name">Salman</span>
                </div>
                <div class="messageSendDate ml-3">
                    12.02.19 10:50
                </div>
            </div>
            <div class="content">
                <div class="message-text">
                    <div class="holder">
                        <div class="audio green-audio-player">
                            <div class="play-pause-btn" @click="play">
                                <v-icon v-if="!activate">play_arrow</v-icon>
                                <v-icon v-else>pause</v-icon>
                            </div>

                            <div class="controls">
                                <span class="current-time">{{ currentTime }}</span>
                                <!--<div class="slider" data-direction="horizontal" ref="slider">
                                    <div class="progress" :style="{width: progress}">
                                        <div class="pin" id="progress-pin" data-method="rewind"></div>
                                    </div>
                                </div>-->
                                <v-slider
                                    v-model="progress"
                                    class="m-0 p-0"
                                    track-color="#D8D8D8"
                                    color="#44BFA3"
                                ></v-slider>
                                <span class="total-time">{{ duration }}</span>
                            </div>

                            <audio crossorigin ref="audio">
                                <source src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/Swing_Jazz_Drum.mp3" type="audio/mpeg">
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "VoiceTemplate",

        data() {
            return {
                activate: false,
                duration: 0,
                currentTime: '0:00',
                progress: 0,
                draggableClasses: ['pin'],
                currentlyDragged: null,
            }
        },

        methods: {
            play() {
                this.activate = !this.activate;
                if (this.activate)
                    this.$refs.audio.play();
                else
                    this.$refs.audio.pause();
            },

            /**
             * Возвращает длину текущего аудио/видео (в секундах)
             */
            formatTime(time) {
                let min = Math.floor(time / 60);
                let sec = Math.floor(time % 60);
                return min + ':' + ((sec<10) ? ('0' + sec) : sec);
            },

            /**
             * Устанавливает или возвращает текущую позицию воспроизведения в аудио/видео (в секундах)
             */
            updateProgress() {
                let current = this.$refs.audio.currentTime;
                let percent = (current / this.$refs.audio.duration) * 100;
                this.progress = percent;

                this.currentTime = this.formatTime(current);
            },

            /**
             * get range box
             */
            getRangeBox(event) {
                let rangeBox = event.target;
                let el = this.currentlyDragged;
                if(event.type === 'click' && this.isDraggable(event.target)) {
                    rangeBox = event.target.parentElement.parentElement;
                }
                if(event.type === 'mousemove') {
                    rangeBox = el.parentElement.parentElement;
                }
                return rangeBox;
            },

            /**
             * get Coefficient
             */
            getCoefficient(event) {
                let slider = this.getRangeBox(event);
                let rect = slider.getBoundingClientRect();
                let K = 0;
                if(slider.dataset.direction === 'horizontal') {

                    let offsetX = event.clientX - slider.offsetLeft;
                    let width = slider.clientWidth;
                    K = offsetX / width;

                } else if(slider.dataset.direction === 'vertical') {

                    let height = slider.clientHeight;
                    let offsetY = event.clientY - rect.top;
                    K = 1 - offsetY / height;

                }
                return K;
            },

            /**
             * перемотка
             */
            rewind(event) {
                if(this.inRange(event)) {
                    this.$refs.audio.currentTime = this.$refs.audio.duration * this.getCoefficient(event);
                }
            },

            /**
             * is Draggable
             */
            inRange(event) {
                let rangeBox = this.getRangeBox(event);
                let rect = rangeBox.getBoundingClientRect();
                let direction = rangeBox.dataset.direction;
                if(direction === 'horizontal') {
                    let min = rangeBox.offsetLeft;
                    let max = min + rangeBox.offsetWidth;
                    if(event.clientX < min || event.clientX > max) return false;
                } else {
                    let min = rect.top;
                    let max = min + rangeBox.offsetHeight;
                    if(event.clientY < min || event.clientY > max) return false;
                }
                return true;
            },

            /**
             * is Draggable
             */
            isDraggable(el) {
                let canDrag = false;
                let classes = Array.from(el.classList);
                this.draggableClasses.forEach(draggable => {
                    if(classes.indexOf(draggable) !== -1)
                        canDrag = true;
                });
                return canDrag;
            },

    },

        mounted() {
            this.$refs.audio.addEventListener('loadedmetadata', () => {
                this.duration = this.formatTime(this.$refs.audio.duration);
            });

            this.$refs.audio.addEventListener('timeupdate', this.updateProgress);

            this.$refs.audio.addEventListener('ended', function(){
                this.activate = !this.activate;
                this.progress = 0;
                this.currentTime = 0;
            });
        },
    }
</script>

<style scoped>
    li {
        padding: 0 25px;
        margin: 10px 0 15px 0px;
        list-style-type: none;
        text-align: left;
    }
    .user-message {
        text-align: left;
    }
    .my-message {
        text-align: right;
    }
    li.my-message .content {
        background: rgb(1, 167, 177);
        color: white
    }
    .my-message > .message-wrapper > .content .message-text {
        text-align: left;
        color: #fff;
    }

    .message-wrapper {
        display: inline-block;
        min-width: 40%;
    }

    /* < header > */
    .message-wrapper > .header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
    .message-wrapper > .header .userInfo {
        position: relative;
    }
    .message-wrapper > .header .user-image {
        display: inline-block;
        position: absolute;
        z-index: 1;
        left: -21px;
        top: -4px;
    }
    .message-wrapper > .header .user-name {
        display: inline-block;
        margin-left: 25px;
        color: white;
    }
    .message-wrapper > .header .user-image i {
        border: 0px solid white;
        border-radius: 50%;
        background: white;
        color: black;
    }
    .message-wrapper > .header .messageSendDate {
        color: #fff;
        font-size: 11px;
    }

    /* < content > */
    .message-wrapper > .content {
        background: white;
        border-radius: 3px;
        display: inline-block;
        position: relative;
        width: 100%;
    }
    .message-wrapper > .content .message-text{
        color: #041720;
    }
</style>
