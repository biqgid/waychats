<template>
    <v-container fluid grid-list-md text-xs-center class="h-100 p-0">
        <!--<v-layout row wrap class="h-100 m-0">

            <v-flex xs12 lg6 md4 sm12 class="py-0">
                <v-layout row wrap>
                    <v-flex xs12>
                        <search-component></search-component>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <developments></developments>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <map-component></map-component>
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 lg3 md4 sm12 class="py-0">
                <mini-c-r-m></mini-c-r-m>
            </v-flex>

            <v-flex xs12 lg3 md4 sm12 class="py-0">
                <messenger></messenger>
            </v-flex>

        </v-layout>-->

        <!--<grid-layout
            :layout.sync="layout"
            :col-num="12"
            :row-height="12"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            autoSize="true"
            :margin="[12, 12]"
            :use-css-transforms="true"
            class="m-0 p-0 h-100"
        >

            <grid-item v-for="item in layout"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i">
                <component v-bind:is="item.componentName"></component>
            </grid-item>
        </grid-layout>-->

        <v-flex xs6 class="position-relative">
            <search-component class="search-fixed"></search-component>
        </v-flex>

        <grid-layout
            v-if="getComponents"
            :layout.sync="getComponents"
            :col-num="12"
            :row-height="1"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="false"
            :margin="[10, 10]"
            :use-css-transforms="true"
            dragAllowFrom=".v-toolbar"
            @layout-created="layoutCreatedEvent"
            @layout-before-mount="layoutBeforeMountEvent"
            @layout-mounted="layoutMountedEvent"
            @layout-ready="layoutReadyEvent"
            @layout-updated="layoutUpdatedEvent"
            class="h-100"
        >

            <template v-for="(item, index) in getComponents">
                <grid-item v-if="item.is_opened"
                           dragAllowFrom=".v-toolbar"
                           v-show="item.is_visible"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i"
                           :is-draggable="item.isDraggable"
                           :is-resizable="item.isResizable"
                           @resize="resizeEvent"
                           @move="moveEvent"
                           @resized="resizedEvent"
                           @moved="movedEvent">
                    <component v-bind:is="item.name" :index="index"></component>
                </grid-item>
            </template>
        </grid-layout>
    </v-container>
</template>

<script>
    import VueGridLayout from 'vue-grid-layout';
    import Messenger from '../../components/Messenger/V2/MessengerComponent';
    import MiniCRM from '../../components/CRM/V1/MiniCRM';
    import MapComponent from '../../components/Maps/MapComponent';
    import SearchComponent from '../../components/Search/V1/Search';
    import Developments from '../../components/Developments/Developments';
    import Calculator from '../../components/Calculator/CalculatorComponent';
    import Converter from '../../components/Converter/Converter';
    import FastConverter from '../../components/Converter/FastConverter';

    export default {
        name: "Home",

        data() {
            return {
                siteComponents: null
            }
        },

        components: {
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
            Messenger,
            MiniCRM,
            MapComponent,
            SearchComponent,
            Developments,
            Calculator,
            Converter,
            FastConverter,
        },

        computed: {
            getComponents() {
                if (this.$store.getters.GET_USER_STRUCTURE)
                    return this.$store.getters.GET_USER_STRUCTURE;
                else
                    return this.$store.getters.GET_DEFUALT_STRUCTURE;
            }
        },

        methods: {
            layoutCreatedEvent: function(newLayout)
            {
                //console.log("Created layout: ", newLayout)
            },

            layoutBeforeMountEvent: function(newLayout){
                //console.log("beforeMount layout: ", newLayout)
            },

            layoutMountedEvent: function(newLayout){
                //console.log("Mounted layout: ", newLayout)
            },

            layoutReadyEvent: function(newLayout){
                //console.log("Ready layout: ", newLayout)
            },

            layoutUpdatedEvent: function(newLayout){
                this.$store.dispatch('UPDATE_STRUCTURE', newLayout)
            },

            moveEvent: function(i, newX, newY){
                //console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
            },

            resizeEvent: function(i, newH, newW, newHPx, newWPx){
                console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
            },

            movedEvent: function(i, newX, newY){
                console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
            },

            /**
             *
             * @param i the item id/index
             * @param newH new height in grid rows
             * @param newW new width in grid columns
             * @param newHPx new height in pixels
             * @param newWPx new width in pixels
             *
             */
            resizedEvent: function(i, newH, newW, newHPx, newWPx){
                console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
            },
        }
    }
</script>

<style scoped>
    .search-fixed {
        position: absolute;
        left: 10px;
        right: 5px;
        top: 10px;
        bottom: 0;
        z-index: 9999999999;
    }
</style>
