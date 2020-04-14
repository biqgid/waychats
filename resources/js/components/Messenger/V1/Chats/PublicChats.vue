<template>
    <ul class="px-2 mt-2" id="messenger-content-list" v-chat-scroll="{smooth: true}">
        <message
            v-for="(value, index) in messages"
            :key="index"
            :data="value">
        </message>
    </ul>
</template>

<script>
    import Message from '../Message/Message';


    export default {
        name: "PublicChats",

        data() {
            return {
                markerNames: ['first', 'second', 'third'],
                show: true,
                isVisible: true,
            }
        },

        components: {
            Message,
        },

        methods: {
            markerVisible(name) {
                console.log(`marker ${name} is visible!`)
            },
            markerNotVisible(name) {
                console.log(`marker ${name} is no longer visible!`)
            },

            visibilityChanged (isVisible, entry) {
                this.isVisible = isVisible
                console.log(entry)
            }
        },

        computed: {
            messages() {
                return this.$store.getters.MESSAGES
            }
        },

    }
</script>

<style scoped>
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
