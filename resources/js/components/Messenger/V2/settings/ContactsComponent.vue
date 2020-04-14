<template>
    <v-list subheader>
        <v-subheader>Контакты</v-subheader>

        <template v-if="contacts">
            <v-list-tile
                v-for="contact in contacts"
                :key="contact.id"
                avatar
                @click="section('private-chat', contact.user)"
            >
                <v-list-tile-avatar>
                    <avatar :src="contact.user.avatar" :username="contact.user.email" :size="30" style="font-size: 18px;"></avatar>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>
                        <!--<span v-if="contact.name && contact.surname">{{ contact.name }} {{ contact.surname }}</span>-->
                        <!--<span v-else-if="!contact.name">{{ contact.phone }}</span>-->
                        <span>{{ contact.user.phone }}</span>
                    </v-list-tile-title>
                </v-list-tile-content>

                <!--<v-list-tile-action>
                    <v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>
                </v-list-tile-action>-->
            </v-list-tile>
        </template>

        <template v-else>
            <v-list-tile>
                <v-list-tile-content>
                    <v-list-tile-title>У вас нет контактов</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>
</template>

<script>
    import Avatar from 'vue-avatar';

    export default {
        name: "ContactsComponent",

        data () {
            return {
            }
        },

        components: {
            Avatar,
        },

        beforeMount() {
            this.$store.dispatch('CONTACTS');
        },

        computed: {
            contacts() {
                return this.$store.getters.CONTACTS
            },
        },

        methods: {
            section(val, user) {
                this.$store.commit('SECTION', val);
                this.$store.commit('SET_PRIVATE_USER', user);
            },
        }
    }
</script>

<style scoped>

</style>
