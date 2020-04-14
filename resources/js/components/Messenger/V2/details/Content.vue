<template>
        <component v-bind:is="sections"></component>
</template>

<script>
    import Event from '../../../../app/Events/Event';

    import ChatsComponent from '../templates/ChatsComponent';
    import AllMessagesComponent from '../templates/AllMessagesComponent';
    import TrucksMessagesComponent from '../templates/TrucksMessagesComponent';
    import CarriageMessagesComponent from '../templates/CarriageMessagesComponent';
    import PrivateChatComponent from '../private/PrivateTemplateComponent';

    import AddContactComponent from '../settings/AddContactComponent';
    import ContactsComponent from '../settings/ContactsComponent';


    export default {
        name: "Content",

        data() {
            return {
                message_form: true,
            }
        },

        computed: {
            sections(){
                return this.$store.getters.SECTIONS
            },
        },

        beforeMount() {
            Event.$on('hide-form-message', (data) => {
                this.message_form = data
            });
        },

        components: {
            ChatsComponent,
            AllMessagesComponent,
            TrucksMessagesComponent,
            CarriageMessagesComponent,
            AddContactComponent,
            ContactsComponent,
            PrivateChatComponent,
        }
    }
</script>

<style scoped>

</style>
