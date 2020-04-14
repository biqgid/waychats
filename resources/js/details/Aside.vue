<template>
    <v-navigation-drawer
        fixed
        clipped
        :value="drawer"
        :mini-variant.sync="mini"
        mini-variant-width="60"
        width="250"
        color="#041821"
        class="app-aside"
        app
    >
        <v-list light>
            <template v-for="(item, index) in userComponents">
                <v-list-tile :key="index" @click="openComponent(index, true, item.is_opened)">
                    <v-list-tile-action>
                        <v-icon :style="{color: color(item.is_opened)}">{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                </v-list-tile>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Aside",
        computed:  {
            drawer() {
                return this.$store.getters.DRAWER;
            },

            mini() {
                return this.$store.getters.MINI;
            },

            userComponents() {
                if (this.$store.getters.GET_USER_STRUCTURE)
                    return this.$store.getters.GET_USER_STRUCTURE;
                else
                    return this.$store.getters.GET_DEFUALT_STRUCTURE;
            },
        },

        methods: {
            openComponent(index, value, is_opened) {
                if (!is_opened) {
                    this.$store.commit('CLOSE_COMPONENT', {index, value});
                    let options = {
                        structure: this.$store.getters.GET_USER_STRUCTURE ? this.$store.getters.GET_USER_STRUCTURE : this.$store.getters.GET_DEFUALT_STRUCTURE,
                        index: index,
                        value: value,
                    };
                    this.$store.dispatch('CLOSE_COMPONENT', options)
                }
            },

            color(value) {
                if (value) return '#38c172';
                else return 'white';
            },
        }
    }
</script>

<style scoped>
    aside {
        background-color: #041821 !important;
    }
    /*.theme--light.v-icon {
        color: white;
    }*/
    .v-list__tile__title {
        color: white;
    }
    .v-list__tile__action {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-right: 15px;
        min-width: auto !important;
    }
</style>
