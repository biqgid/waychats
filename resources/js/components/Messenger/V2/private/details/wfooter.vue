<template>
    <v-card-actions class="position-absolute w-100 footer-form">
        <message-form @send='onSend'></message-form>
    </v-card-actions>
</template>

<script>
    import MessageForm from '../../../V1/Form/MessageForm';
    import Event from '../../../../../app/Events/Event';

    export default {
        name: "wfooter",
        components: { MessageForm },
        computed: {
            room_id() {
                return this.$store.getters.GET_ROOM_ID
            },

            user_id() {
                return this.$store.getters.GET_PRIVATE_USER.id
            }
        },

        methods: {
            onSend (value) {
                if (this.room_id !== null) {
                    this.$store.dispatch('ADD_PRIVATE_MESSAGE', {
                        message: value,
                        room_id: this.room_id,
                        status: 0,
                        selfMessage: true
                    });

                    Event.$emit('clearForm');
                }else {
                    this.$store.dispatch('ADD_ROOM', {
                        message: value,
                        status: 0,
                        user_id: this.user_id,
                        selfMessage: true
                    });

                    Event.$emit('clearForm');
                }
            },
        },
    }
</script>

<style scoped>
    .footer-form {
        bottom: 0;
    }
</style>
