<template>
    <v-toolbar
        absolute
        color="#fff"
        height="40"
        scroll-off-screen
        scroll-target="#scrolling-techniques"
    >
        <v-toolbar-side-icon>
            <avatar :src="contact.user.avatar" :username="userGravatar" :size="30" style="font-size: 18px;"></avatar>
        </v-toolbar-side-icon>

        <v-toolbar-title class="subheading ml-1">{{ userName }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
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

    export default {
        name: "PrivateHeader",
        props: ['contact'],

        components: {
            Avatar,
        },

        computed: {
            userName() {
                if (this.contact.name)
                    return this.contact.name;
                else if (!this.contact.name)
                    return this.contact.user.name;
                else if (!this.contact.user.name)
                    return this.contact.user.phone;
                else
                    return this.contact.user.email
            },

            userGravatar() {
                if (!this.contact.user.avatar)
                    return this.contact.name
                /*if (!this.contact.user.avatar)
                    return this.contact.name;
                else if (!this.contact.user.avatar && !this.contact.user.name)
                    return this.contact.user.email;
                else if (!this.contact.user.avatar && !this.contact.user.name && this.contact.user.email)
                    return this.contact.user.phone;
                else
                    return 'Waychats'*/
            }
        }
    }
</script>

<style scoped>

</style>
