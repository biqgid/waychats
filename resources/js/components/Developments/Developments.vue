<template>
    <v-card class="h-100">
        <v-toolbar color="white" dense height="40" class="px-0">
            <v-toolbar-title class="subheading">Инструменты</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon small @click="hideComponent(index, false)">
                <v-icon small>remove</v-icon>
            </v-btn>

            <v-btn icon small @click="closeComponent(index, false)">
                <v-icon small>clear</v-icon>
            </v-btn>

            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon small v-on="on">
                        <v-icon small>more_vert</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-title></v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <v-card class="pb-2">
            <v-layout row wrap class="px-3 input-routes">
                <v-flex xs12 md6>
                    <v-autocomplete
                        v-model="routes.location"
                        :loading="location_loading"
                        :items="items"
                        :search-input.sync="location"
                        cache-items
                        dense
                        flat
                        item-text="displayName"
                        item-value="value"
                        hide-no-data
                        hide-details
                        label="От куда?"
                    ></v-autocomplete>
                </v-flex>

                <v-flex xs12 md6>
                    <v-autocomplete
                        v-model="routes.destination"
                        :loading="destination_loading"
                        :items="items"
                        :search-input.sync="destination"
                        cache-items
                        dense
                        flat
                        item-text="displayName"
                        item-value="value"
                        hide-no-data
                        hide-details
                        label="Куда?"
                    ></v-autocomplete>
                </v-flex>
            </v-layout>

            <transition name="fade">
                <v-layout v-if="routes.location" class="m-0 mb-2 px-3">
                    <div class="d-inline-block body-2 mr-2">Растояние: </div>
                    <div class="d-inline-block body-2 text-danger mr-3">{{ distance }}</div>
                    <div class="d-inline-block body-2 indigo--text text--darken-2" @click="buildRoute">Показать на карте</div>
                </v-layout>
            </transition>

            <transition name="fade">
                <v-layout row wrap v-if="routes.location" class="mb-3">
                    <v-flex xs6 md3 class="px-3">
                        <button class="w-100 m-0 action" @click="getComponent('add-transport-form')">Добавить авто</button>
                    </v-flex>
                    <v-flex xs6 md3 class="px-3">
                        <button class="w-100 m-0 action" @click="getComponent('add-shipments-form')">Добавить груз</button>
                    </v-flex>
                    <v-flex xs6 md3 class="px-3">
                        <button class="w-100 m-0 action" @click="searchAdvert('cars/search')">Поиск авто</button>
                    </v-flex>
                    <v-flex xs6 md3 class="px-3">
                        <button class="w-100 m-0 action">Поиск груза</button>
                    </v-flex>
                </v-layout>
            </transition>

            <v-layout class="m-0">
                <!-- components -->
                <transition name="fade">
                    <transition name="switch">
                        <component :is="component" :route-list="routes"></component>
                    </transition>
                </transition>
                <!-- components -->
            </v-layout>
        </v-card>
    </v-card>
</template>

<script>
    import AddTransportForm from '../Forms/AddTransportForm';
    import AddShipmentsForm from '../Forms/AddShipmentsForm';
    import Event from '../../app/Events/Event';

    import Maps from '../../app/Map/MapClass';

    export default {
        name: "Developments",
        props: ['index'],
        data() {
            return {
                routes: {
                    location: null,
                    intermediate: [],
                    destination: null,
                    distance: null,
                },

                location: null,
                destination: null,

                location_loading: false,
                destination_loading: false,
                items: [],
                search: null,
                component: null, //add-transport-form
            }
        },
        watch: {
            location(val) {
                this.location_loading = true;

                Maps.suggest(val).then(response => {
                    this.location_loading = false;
                    this.items = response
                });
            },
            destination(val) {
                this.destination_loading = true;

                Maps.suggest(val).then(response => {
                    this.destination_loading = false;
                    this.items = response
                });
            }
        },
        methods: {
            getDistance(e) {
                if (this.routes.location && this.routes.destination) {
                    let disstance  = Maps.distance([this.routes.location, this.routes.destination]).then(resp => {
                        let q = resp.getHumanLength();
                        this.routes.distance = '~' + q.split('&')[0] + ' км.';
                    });
                }
                else
                    this.routes.distance =  this.routes.location
            },
            buildRoute() {
                this.$store.dispatch('GET_ROUTE_DISTANCE')
            },

            /**
             * get component
             * and show
             *
             * @param val
             */
            getComponent(val) {
                this.changeHeight(this.index, 50.6);
                 this.component = val
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

            changeHeight(index, value) {
                let options = {
                    index: index,
                    value: value,
                };
                this.$store.commit('CHANGE_HEIGHT', options)
            },

            searchAdvert(path) {
                let data = {
                    path: path,
                    route: this.routes
                };

                this.$store.dispatch('SEARCH_ADVERTS', data);
            }
        },
        components: {
            AddTransportForm,
            AddShipmentsForm,
        },

        computed: {
            distance() {
                this.changeHeight(this.index, 17.5);
                this.getDistance();
                return this.routes.distance
            }
        }
    }
</script>

<style scoped>
    .action {
        background: #128a93;
        cursor: pointer;
        font: bold 13px arial;
        padding: 8px 8px;
        color: #fff;
        border: none;
        margin: 5px;
        border-radius: 3px;
        -webkit-box-shadow: 0px 1px 0px #075e79, 0px 2px 0px #0a7083, 0px 4px 6px rgba(0, 0, 0, .6);
        box-shadow: 0px 1px 0px #075e79, 0px 2px 0px #0a7083, 0px 4px 6px rgba(0, 0, 0, .6);
        -webkit-transition: ease .15s all;
        transition: ease .15s all;
    }
    .action::-moz-focus-inner{border:0}
    .action:hover {
        box-shadow: inset 0 1px #139faa, inset 1px 0 #0b8089, inset -1px 0 #128a93, inset 0 -1px #128a93, 0 2px #128a93, 0 3px #A5A5A5, 0 4px 2px rgba(0,0,0,0.4);
        background: -moz-linear-gradient(top, #109aa4 0%, #0ea5b0 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#109aa4), color-stop(100%,#0ea5b0));
        background: -o-linear-gradient(top, #109aa4 0%,#0ea5b0 100%);
        background: -ms-linear-gradient(top, #109aa4 0%,#0ea5b0 100%);
        background: linear-gradient(top, #109aa4 0%,#0ea5b0 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#109aa4', endColorstr='#0ea5b0',GradientType=0 );
        background-color: #129da8;

    }
    .action:active {
        top: 0px;
        border: 1px solid #B9B9B9;
        border-top: 1px solid #797979;
        border-bottom: 1px solid #15abb6;
        background: #128a93;
        box-shadow: inset 0 1px 2px #0d777f;
    }
    .action:focus {
        outline: none;
    }
    .indigo--text {
        cursor: pointer;
    }

    .switch-transition {
        transition: all .5 ease-in-out;
    }
    .switch-enter {
        opacity: 0;
    }
    .switch-leave {
        opacity: 1;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
