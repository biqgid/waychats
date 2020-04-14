<template>
    <div>
        <v-card-text id="V1-Messenger-Content" :class="{'mini': toggleSearch}">
            <div class="h-100">
                <ul class="px-2 m-0" id="messenger-content-list" v-chat-scroll="{smooth: true}">
                    <message
                        v-for="(value, index) in messages"
                        :key="index"
                        :data="value">
                    </message>
                </ul>
            </div>
        </v-card-text>

        <v-card-actions class="position-absolute w-100 footer-form">
            <message-form></message-form>
        </v-card-actions>
    </div>
</template>

<script>
    import Message from '../../V1/Message/Message';
    import MessageForm from '../../V1/Form/MessageForm';

    export default {
        name: "CarriageMessagesComponent",

        computed: {
            messages() {
                return this.$store.getters.MESSAGES
            },

            toggleSearch() {
                return this.$store.getters.TOGGLE_SEARCH;
            }
        },

        components: {
            Message,
            MessageForm,
        },
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
