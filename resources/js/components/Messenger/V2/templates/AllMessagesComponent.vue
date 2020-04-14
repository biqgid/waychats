<template>
    <div class="wrap-public">
        <v-card-text id="V1-Messenger-Content" :class="{'mini': toggleSearch}">
            <div class="h-100">
                <draggable tag="ul" class="px-2 m-0" id="messenger-content-list" v-chat-scroll="{smooth: true}" v-model="PUBLIC_MESSAGES" v-bind="dragOptions">
                    <message
                        v-for="(value, index) in PUBLIC_MESSAGES"
                        :key="index"
                        :data="value">
                    </message>
                </draggable>
            </div>
        </v-card-text>

        <v-card-actions class="position-absolute w-100 footer-form">
            <message-form @send='onSend'></message-form>
        </v-card-actions>
    </div>
</template>

<script>
    import Message from '../../V1/Message/Message';
    import MessageForm from '../../V1/Form/MessageForm';
    import { mapGetters } from 'vuex';
    import draggable from 'vuedraggable'

    import Event from '../../../../app/Events/Event';

    export default {
        name: "AllMessagesComponent",

        /**
         * local register detail component
         */
        components: {
            Message,
            MessageForm,
            draggable,
        },

        /**
         * event created
         * get messages request
         */
        created() {
            this.$store.dispatch('GET_PUBLIC_MESSAGES')
        },

        /**
         * event mounted
         * listen to the event of a new message
         */
        mounted() {
            Echo.channel('public-messages')
                .listen('.public.messages', (event) => {
                    console.log(event);
                    this.$store.commit('ADD_PUBLIC_MESSAGE', event.message)
                });
        },

        /**
         * component computed event
         */
        computed: {
            /***
             * смешиваем результат mapGetters с внешним объектом computed
             */
            ...mapGetters([
                'PUBLIC_MESSAGES',
            ]),

            /**
             * Drag and Drop options
             */
            dragOptions() {
                return {
                    animation: 200,
                    group: "application",
                    disabled: false,
                    ghostClass: "ghost",
                    filter: ".ignore-elements"
                };
            },

            toggleSearch() {
                return this.$store.getters.TOGGLE_SEARCH;
            }
        },

        /**
         * functions
         */
        methods: {
            /**
             * @method  onSend send new message
             * @param value
             */
            onSend (value) {
                this.$store.dispatch('ADD_PUBLIC_MESSAGE', value);
            },
        }
    }
</script>

<style scoped>

    #V1-Messenger-Content {
        position: absolute;
        left: 0;
        right: 0;
        top: 70px;
        bottom: 0px;
        padding: 10px 0 !important;
        padding-bottom: 70px !important;
        background: radial-gradient(rgb(22, 146, 152), rgb(14, 118, 135));
    }
    .mini {
        top: 40px !important
    }

    .footer-form {
        bottom: 0;
    }

    ul {
        height: 100%;
        margin: 0;
        overflow: auto;
    }

    ul::-webkit-scrollbar{
        width:6px;
    }

    ul::-webkit-scrollbar-thumb{
        border-width: 1px 1px 1px 2px;
        border-color: #777;
        background-color: #e2e2e2;
        border-radius: 10px;
    }

    ul::-webkit-scrollbar-track{
        border-width:0;
    }

</style>
