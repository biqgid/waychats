<template>
    <div id="private-chat-template-wrapper" class="h-100">
        <w-header-component :contact="GET_PRIVATE_USER"></w-header-component>
        <w-content-component :messages="GET_PRIVATE_MESSAGES"></w-content-component>
        <w-footer-component></w-footer-component>

        <div id="call" v-if="VIDEO_CALL">
            <video autoplay ref="userCamera" id="userCamera"></video>
            <video autoplay ref="myVideo" id="myCamera"></video>

            <v-btn icon id="endCall" @click="videoCallEnd">
                <v-icon>call_end</v-icon>
            </v-btn>
        </div>

    </div>
</template>

<script>
    import WHeaderComponent from './details/wheader';
    import WContentComponent from './details/wcontent';
    import WFooterComponent from './details/wfooter';
    import Event from '../../../../app/Events/Event';
    import Recorder from '../../../../app/Recorder/Recorder';
    import $ from 'jquery';

    import { mapGetters } from 'vuex';

    export default {
        name: "PrivateTemplateComponent",

        data() {
            return {
            }
        },

        /**
         * local register detail component
         */
        components: {
            WHeaderComponent,
            WContentComponent,
            WFooterComponent
        },

        /**
         * component computed event
         */
        computed: {
            /***
             * смешиваем результат mapGetters с внешним объектом computed
             */
            ...mapGetters([
                'GET_PRIVATE_USER',
                'GET_PRIVATE_MESSAGES',
                'GET_ROOM_ID',
                'VIDEO_CALL'
            ]),
        },

        /**
         * component mounted event
         */
        mounted() {
            this.$store.commit('TOGGLE_CHAT_HEADER', false);

            if (this.GET_ROOM_ID !== null)
                this.$store.dispatch('GET_PRIVATE_MESSAGES', {room_id: this.GET_ROOM_ID});
            else
                return false;

            Event.$on('startVideoCall', () => {
                this.videoCallStart()
            });

            Echo.private(`room.${this.GET_ROOM_ID}`)
                .listen('.private.messages', ({message}) => {
                    this.$store.commit('ADD_PRIVATE_MESSAGES', message)
                })


        },

        methods: {
            videoCallEnd() {
                this.$store.commit('SET_VIDEO_CALL', false);
            },
            videoCallStart() {
                this.$store.commit('SET_VIDEO_CALL', true);

                let recorder = new Recorder(true, false);
                recorder.videoCall(this.$refs.myVideo);

                console.log($("#userCamera"))
            },
        }
    }
</script>

<style scoped>
    #private-chat-template-wrapper {
        background: radial-gradient(rgb(22, 146, 152), rgb(14, 118, 135));
        position: relative;
    }

    #userCamera {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: black;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    #myCamera {
        position: absolute;
        right: 0;
        bottom: 0;
        background: black;
        width: 250px;
        z-index: 10;
        border: 1px solid white;
    }

    #endCall {
        color: red;
        position: absolute;
        z-index: 11;
        border: 1px solid red;
        right: 0;
    }
</style>
