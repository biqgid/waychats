<template>
    <v-card id="search-block" class="h-100">
        <!--<v-toolbar color="white" dense height="40" class="px-0">
            <v-toolbar-title class="subheading">Инструменты</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon small>
                <v-icon small>remove</v-icon>
            </v-btn>

            <v-btn icon small>
                <v-icon small>clear</v-icon>
            </v-btn>
        </v-toolbar>-->
        <v-card class="h-100">
            <v-layout row wrap class="m-0 p-0 h-100">
                <v-flex xs12 class="p-0 h-100">
                    <div id="autocomplete" class="position-relative h-100">
                        <v-text-field
                            label="Solo"
                            v-model="search"
                            placeholder="Поиск..."
                            class="m-0"
                            height="100%"
                            append-icon="search"
                            solo
                        ></v-text-field>
                        <v-card id="autocomplete-list" class="position-absolute" v-if="search">
                            <template v-for="item in items">
                                <v-list two-line subheader dense v-if="item.data.length">
                                    <v-subheader class="subheader-style">{{ item.section }}</v-subheader>
                                    <template v-for="value in item.data">
                                        <v-list-tile @click="">
                                            <v-list-tile-content>


                                                <template v-if="item.section === 'Все сообщения'">

                                                    <template v-if="typeof value.content === 'object'">
                                                        <v-list-tile-title v-if="value.content">
                                                            <text-highlight :queries="search">{{ value.content.routes.location }} - {{ value.content.routes.destination }}</text-highlight>
                                                        </v-list-tile-title>

                                                        <v-list-tile-sub-title v-if="value.content">
                                                            <text-highlight :queries="search">{{ value.content.description }}</text-highlight>
                                                        </v-list-tile-sub-title>
                                                    </template>

                                                    <template v-else>
                                                        <v-list-tile-title v-if="value.content">
                                                            <text-highlight :queries="search">{{ value.user.phone }}</text-highlight>
                                                        </v-list-tile-title>

                                                        <v-list-tile-sub-title v-if="value.content">
                                                            <text-highlight :queries="search">{{ value.content }}</text-highlight>
                                                        </v-list-tile-sub-title>
                                                    </template>

                                                </template>



                                                <template v-if="item.section === 'Рейсы'">
                                                    <v-list-tile-title v-if="value.location">
                                                        <text-highlight :queries="search">
                                                            {{ value.location }} >
                                                            {{ value.destination }}
                                                        </text-highlight>
                                                    </v-list-tile-title>
                                                    <v-list-tile-sub-title v-if="value.description">
                                                        <text-highlight :queries="search">{{ value.description }}</text-highlight>
                                                    </v-list-tile-sub-title>
                                                </template>
                                                <template v-if="item.section === 'контакты'">
                                                    <v-list-tile-title>
                                                        <text-highlight :queries="search">
                                                            {{ value.name }}
                                                            {{ value.surname }}
                                                        </text-highlight>
                                                    </v-list-tile-title>
                                                </template>

                                                <template v-if="item.section === 'Пользователи'">
                                                    <v-list-tile-title>
                                                        <text-highlight :queries="search">
                                                            {{ value.name }}
                                                            {{ value.phone }}
                                                        </text-highlight>
                                                    </v-list-tile-title>
                                                    <v-list-tile-sub-title>
                                                        <text-highlight :queries="search">{{ value.email }}</text-highlight>
                                                    </v-list-tile-sub-title>
                                                </template>

                                                <template v-if="item.section === 'Машины'">
                                                    <v-list-tile-title>
                                                        <text-highlight :queries="search">
                                                            {{ value.model }}
                                                            {{ value.carcass }}
                                                        </text-highlight>
                                                    </v-list-tile-title>
                                                    <v-list-tile-sub-title>
                                                        <text-highlight :queries="search">{{ value.description }}</text-highlight>
                                                    </v-list-tile-sub-title>
                                                </template>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </template>
                                </v-list>
                            </template>
                        </v-card>
                    </div>
                </v-flex>
            </v-layout>
        </v-card>
    </v-card>
</template>

<script>

    import Fuse from 'fuse.js';
    import TextHighlight from 'vue-text-highlight';

    export default {
        name: "Search",

        data () {
            return {
                search: null,
                items: [],
            }
        },

        components: {
            TextHighlight
        },

        watch: {
            search(val) {
                axios.post('/api/data/search', {search: val}).then(response => {
                    this.items = response.data;
                });
            },
        },
    }
</script>

<style scoped>
    #autocomplete-list {
        z-index: 9;
        top: 55px;
        left: 0;
        right: 0px;
        max-height: 400px;
        overflow: auto;
    }

    .subheader-style {
        background: #e2e2e2;
        font-size: 14px;
        height: 30px;
    }


</style>
