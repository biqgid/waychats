<template>
    <!-- Toolbar -->
    <v-toolbar color="#041821" dark height="50" fixed clipped-left app class="app-header">
        <v-toolbar-side-icon @click="navigation"></v-toolbar-side-icon>
        <v-toolbar-title class="h-100 ml-2"><v-btn flat class="m-0 h-100" to="/">Waychats</v-btn></v-toolbar-title>

        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/dealings">Сделки</v-btn>
            <v-btn flat>Чат</v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-sm-and-down">
            <template v-if="!currentUser">
                <v-btn flat to="/login">
                    Вход
                </v-btn>
                <v-btn flat  to="/register">Регистрация</v-btn>
            </template>
            <template v-else>
                <v-menu offset-y left>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            fab
                            flat
                            dark
                            class="m-0 head-user-btns"
                            v-on="on"
                        >
                            <v-icon>
                                message
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile @click="logout">
                            Выход
                        </v-list-tile>
                        <v-list-tile to="/my-profile">
                            Мой профиль
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-menu offset-y left>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            fab
                            flat
                            dark
                            class="m-0 head-user-btns"
                            v-on="on"
                        >
                            <v-icon>
                                notifications
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile @click="logout">
                            Выход
                        </v-list-tile>
                        <v-list-tile to="/my-profile">
                            Мой профиль
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-menu offset-y left>
                    <template  v-slot:activator="{ on }">
                        <v-btn
                            fab
                            flat
                            dark
                            class="m-0 head-user-btns"
                            v-on="on"
                        >
                            <avatar :src="currentUser.avatar" :username="currentUser.email" :size="30" style="font-size: 18px;"></avatar>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-tile @click="logout">
                            Выход
                        </v-list-tile>
                        <v-list-tile to="/my-profile">
                            Мой профиль
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </template>
        </v-toolbar-items>
    </v-toolbar>
    <!-- Toolbar -->
</template>

<script>
    import Avatar from 'vue-avatar';
    import SearchComponent from '../components/Search/V1/Search';

    export default {
        name: "Header",

        data() {
            return {
                isLoading: false,
                items: [],
                model: null,
                search: null
            }
        },

        components: {
            Avatar,
            SearchComponent
        },

        methods: {
            navigation() {
                this.$store.state.mini = !this.$store.state.mini;
            },

            logout(){
                this.$store.commit('logout');
                this.$router.push('/login');
            }
        },

        computed:{
            currentUser(){
                return this.$store.getters.currentUser
            }
        },

        watch: {
            search (val) {
                // Items have already been loaded
                if (this.items.length > 0) return

                this.isLoading = true

                // Lazily load input items
                fetch('https://api.coinmarketcap.com/v2/listings/')
                    .then(res => res.json())
                    .then(res => {
                        this.items = res.data
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => (this.isLoading = false))
            }
        }
    }
</script>

<style scoped>
    .v-toolbar {
        box-shadow: 0 0px 0px 0px rgba(0,0,0,.2), 0 0px 5px 0 rgba(0,0,0,.14), 0 0px 0px 0 rgba(0,0,0,.12);
        z-index: 10;
    }

    .user-btn:before, .user-btn:focus:before, .user-btn:hover:before {
        background: none;
    }

    .head-user-btns {
        min-width: 0;
        height: 40px;
        width: 40px;
        padding: 0;
        margin-top: 5px !important;
        margin-right: 10px !important;
    }


</style>
