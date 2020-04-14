<template>
    <v-card-text id="private-chat-content">
        <div class="h-100">
            <ul class="px-2 m-0" id="messenger-content-list" v-chat-scroll="{smooth: true}">
                <template v-if="messages.length">
                    <messages
                        v-for="(value, index) in messages"
                        :key="index"
                        :data="value">
                    </messages>
                </template>
                <template v-else>
                    <v-subheader class="text-white">Не сообщений!!!</v-subheader>
                </template>
            </ul>
        </div>
    </v-card-text>
</template>

<script>
    import Messages from '../messages/MessageComponent';

    export default {
        name: "wcontent",
        props: ['messages'],

        components: {
            Messages,
        },
    }
</script>

<style scoped>
    #private-chat-content {
        position: absolute;
        left: 0;
        right: 0;
        top: 40px;
        bottom: 0px;
        padding: 10px 0 !important;
        padding-bottom: 70px !important;
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
