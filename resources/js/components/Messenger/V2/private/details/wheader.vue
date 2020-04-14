<template>
    <v-toolbar
        absolute
        color="#fff"
        height="40"
        scroll-off-screen
        scroll-target="#scrolling-techniques"
    >
        <v-toolbar-side-icon class="m-0" @click="section('chats')">
            <v-icon small>arrow_back_ios</v-icon>
        </v-toolbar-side-icon>

        <v-toolbar-side-icon class=m-0>
            <avatar :src="contact.avatar" :username="userGravatar" :size="30" style="font-size: 18px;"></avatar>
        </v-toolbar-side-icon>

        <v-toolbar-title class="subheading ml-1">{{ userName }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="videoCallStart">
            <v-icon>video_call</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>phone</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>more_vert</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    import Avatar from 'vue-avatar';
    import Event from '../../../../../app/Events/Event';

    export default {
        name: "wheader",
        props: ['contact'],

        components: {
            Avatar,
        },

        methods: {
            section(val) {
                this.$store.commit('SECTION', val)
            },

            videoCallStart() {
                Event.$emit('startVideoCall');
            },

        },

        computed: {
            userName() {
                if (this.contact.name)
                    return this.contact.name;
                else if (this.contact.phone)
                    return this.contact.phone;
                else if (this.contact.email)
                    return this.contact.email;
                else
                    return 'Пользователь'
            },

            userGravatar() {
                if (!this.contact.avatar) {
                    if (this.contact.name)
                        return this.contact.name;
                    else if (this.contact.email)
                        return this.contact.email;
                    else
                        return this.contact.phone;
                }
            }
        }
    }
</script>

<style scoped>

</style>
