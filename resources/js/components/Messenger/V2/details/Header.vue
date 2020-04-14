<template>
    <v-card-title class="p-0" v-if="header">
        <v-toolbar color="white" dense height="40" class="px-0">
            <v-toolbar-title class="subheading">Чат</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon small @click="toggleSearch = true">
                <v-icon size="22px">
                    search
                </v-icon>
            </v-btn>
            <v-btn icon small @click="hideComponent(index, false)">
                <v-icon small>remove</v-icon>
            </v-btn>

            <v-btn icon small @click="closeComponent(index, false)">
                <v-icon small>clear</v-icon>
            </v-btn>
            <v-menu bottom left offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                        icon
                        v-on="on"
                        small class="m-0"
                    >
                        <v-icon size="20">more_vert</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-tile @click="section('contacts')">
                        <v-list-tile-title>Контакты</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile @click="section('add-contact')">
                        <v-list-tile-title>Добавить контакт</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile @click="">
                        <v-list-tile-title>Новая группа</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile @click="">
                        <v-list-tile-title>Новая рассылка</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile @click="">
                        <v-list-tile-title>Избранные сообщения</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile @click="">
                        <v-list-tile-title>Настройки</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-layout class="m-0 search-wrap" v-if="toggleSearch">
                <v-flex xs12 class="p-0">
                    <v-autocomplete
                        v-model="friends"
                        class="p-0 bg-white"
                        placeholder="Поиск..."
                        prepend-inner-icon="keyboard_backspace"
                        @click:prepend-inner="toggleSearch = false"
                        autofocus
                        clearable
                        height="40"
                        item-text="name"
                        item-value="name"
                        :disabled="isUpdating"
                        :items="people"
                    >
                        <template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                                <v-list-tile-content v-text="data.item"></v-list-tile-content>
                            </template>
                            <template v-else>
                                <v-list-tile-avatar>
                                    <img :src="data.item.avatar">
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                    <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                                </v-list-tile-content>
                            </template>
                        </template>
                    </v-autocomplete>
                </v-flex>
            </v-layout>
        </v-toolbar>
        <template v-if="!toggleSearch">
            <v-tabs
                v-model="model"
                centered
                color="#128d95"
                dark
                slider-color="#025674"
                height="30px"
                class="h-100 w-100"
                grow
            >
                <v-tab @click="section('chats')">
                    Чаты
                </v-tab>

                <v-tab @click="section('all-messages')">
                    Все сообщения
                </v-tab>

                <v-tab @click="section('trucks-messages')">
                    Машины
                </v-tab>

                <v-tab @click="section('carriage-messages')">
                    Грузы
                </v-tab>
            </v-tabs>
        </template>
    </v-card-title>
</template>

<script>
    export default {
        name: "Header",
        props: ['index'],

        data () {
            const srcs = {
                1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
            };

            return {
                model: null,
                searchForm: false,
                active: null,
                autoUpdate: true,
                friends: [],
                isUpdating: false,
                name: 'Midnight Crew',
                people: [
                    { header: 'Group 1' },
                    { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
                    { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
                    { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
                    { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
                    { divider: true },
                    { header: 'Group 2' },
                    { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
                    { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
                    { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
                    { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] }
                ],
                title: 'The summer breeze'
            }
        },

        watch: {
            isUpdating (val) {
                if (val) {
                    setTimeout(() => (this.isUpdating = false), 3000)
                }
            }
        },

        methods: {
            remove (item) {
                const index = this.friends.indexOf(item.name)
                if (index >= 0) this.friends.splice(index, 1)
            },

            section(val) {
                this.$store.commit('SECTION', val)
            },

            hideComponent(index, value) {
                let options = {
                    index: index,
                    value: value,
                };
                this.$store.commit('TOGGLE_VISIBLE', options)
            },

            closeComponent(index, value) {
                this.$store.commit('CLOSE_COMPONENT', {index, value});
                let options = {
                    structure: this.$store.getters.GET_USER_STRUCTURE ? this.$store.getters.GET_USER_STRUCTURE : this.$store.getters.GET_DEFUALT_STRUCTURE,
                    index: index,
                    value: value,
                };
                this.$store.dispatch('CLOSE_COMPONENT', options)
            },
        },


        computed: {
            toggleSearch: {
                get() {
                    return this.$store.getters.TOGGLE_SEARCH
                },
                set(val) {
                    this.$store.commit('TOGGLE_SEARCH', val);
                }
            },

            header() {
                return this.$store.getters.CHAT_HEADER;
            }
        }
    }
</script>

<style scoped>

    .search-wrap {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .v-autocomplete {
        height: 39px;
    }

    .v-input__slot {
        margin: 0px;
    }

    .v-input__prepend-inner {
        margin-left: 4px;
        margin-top: 8px;
    }
</style>
