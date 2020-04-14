<template>
    <v-card class="position-relative maps-container h-100">
        <v-card-title class="p-0">
            <v-toolbar color="white" dense height="40" class="px-0">
                <v-toolbar-title class="subheading">Карта</v-toolbar-title>

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
        </v-card-title>

        <v-navigation-drawer absolute floating clipped class="advert-list" v-model="drawer">
            <v-toolbar flat class="transparent justify-content-end" height="25px">
                <v-btn depressed flat fab @click="drawer = false" class="btn-list-app-close"><v-icon>keyboard_arrow_left</v-icon></v-btn>
            </v-toolbar>
            <map-list-component :items="MAPS_DATA"></map-list-component>
        </v-navigation-drawer>

        <v-card-text class="p-0 mt-2 map-content">
            <div id="map"></div>
        </v-card-text>

        <v-btn depressed small class="btn-list-app-open" @click="drawer = true"><v-icon>keyboard_arrow_right</v-icon></v-btn>
    </v-card>
</template>

<script>
    import { yandexMap, ymapMarker } from 'vue-yandex-maps';
    import MapListComponent from './MapListComponent';
    import MapClass from '../../app/Map/MapClass';

    import { mapGetters } from 'vuex';

    export default {
        name: "MapComponent",

        props: ['index'],

        data() {
            return {
                right: null,
                map: null,
            }
        },

        created: function() {
            ymaps.ready(function () {
                MapClass.create('map');
                MapClass.clasterer();
            });

        },

        /**
         * local register detail component
         */
        components: {
            MapListComponent
        },


        /**
         * component mounted event
         */
        mounted() {
            this.$store.dispatch('GET_MAPS_DATA');
            //this.map = new MapClass();
            /*console.log(this.MAPS_DATA);
            MapClass.addObjects(this.MAPS_DATA)*/


        },

        /**
         * component computed event
         */
        computed: {
            /***
             * смешиваем результат mapGetters с внешним объектом computed
             */
            /*...mapGetters([
                'MAPS_DATA',
            ]),*/

            MAPS_DATA() {
                return this.$store.getters.MAPS_DATA;
            },

            drawer: {
                get() {
                    return this.$store.getters.MAP_DRAWER
                },
                set(value) {
                    this.$store.commit('UPDATE_DRAWER', value)
                }
            }
        },

        methods: {
            closeComponent(index, value) {
                this.$store.commit('CLOSE_COMPONENT', {index, value});
                let options = {
                    structure: this.$store.getters.GET_USER_STRUCTURE ? this.$store.getters.GET_USER_STRUCTURE : this.$store.getters.GET_DEFUALT_STRUCTURE,
                    index: index,
                    value: value,
                };
                this.$store.dispatch('CLOSE_COMPONENT', options)
            },
            hideComponent(index, value) {
                let options = {
                    index: index,
                    value: value,
                };
                this.$store.commit('TOGGLE_VISIBLE', options)
            }
        }

    }
</script>

<style scoped>
    #map {
        width: 100%;
        height: 100%;
    }
    .maps-container {
        overflow: hidden;
    }
    .map-content {
        position: absolute;
        top: 40px;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .advert-list {
        top: 48px;
        bottom: 0px;
        overflow: auto;
        height: auto !important;
    }
    .btn-list-app-open {
        position: absolute;
        top: 50%;
        margin: 0;
        margin-top: -18px;
        left: 0px;
        background: white !important;
        border: 1px solid #f1cca4;
        height: 30px;
        padding: 0;
        width: 40px !important;
        min-width: 40px !important;
    }
    .btn-list-app-close {
        min-height: 10px;
        min-width: 10px;
        height: 25px;
        width: 25px;
        margin: 0;
        margin-right: 10px;
    }
</style>
