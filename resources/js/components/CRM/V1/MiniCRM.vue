<template>
    <v-card class="h-100">
        <v-toolbar color="white" dense height="40" class="px-0">
            <v-toolbar-title class="subheading">CRM-система</v-toolbar-title>

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
        <draggable tag="v-list" two-line subheader class="list-wrap" v-bind="dragOptions" @add="update" v-model="transactions">
            <transaction v-for="(transaction, index) in transactions"
                         :key="index"
                         :transaction="transaction"
                         class="ignore-elements"></transaction>
        </draggable>

        <v-snackbar
            v-model="snackbar.isVisible"
            color="success"
        >
            {{ snackbar.text }}
            <v-btn
                dark
                flat
                @click="snackbar = false"
            >
                Закрыть
            </v-btn>
        </v-snackbar>
    </v-card>
</template>

<script>
    import Transaction from './Transactions';
    import draggable from 'vuedraggable'

    export default {
        name: "MiniCRM",
        props: ['index'],

        components: {Transaction, draggable},

        mounted() {
            this.$store.dispatch('GET_TRANSACTIONS');
            this.$store.dispatch('GET_STAGES');
        },

        computed: {
            transactions: {
                get() {
                    return this.$store.getters.GET_TRANSACTIONS;
                },
                set(items) {
                    let item = items.find(function(element) {
                        return element.content;
                    });
                    let data = {
                        name: null,
                        price: item.content.price,
                        currency: item.content.currency,
                        data: item.content,
                    };
                    this.$store.dispatch('ADD_TRANSACTIONS', data)
                }
            },

            dragOptions() {
                return {
                    animation: 200,
                    group: "application",
                    disabled: false,
                    ghostClass: "ghost",
                    filter: ".ignore-elements"
                };
            },

            snackbar: {
                get() { return this.$store.getters.GET_SNACKBAR },
                set(val) { return this.$store.commit('SET_SNACKBAR', val) }
            }
        },

        methods: {
            update(evt) {
                console.log(evt)
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
        }
    }
</script>

<style scoped>
    .v-list {
        position: absolute;
        left: 0;
        right: 4px;
        top: 46px;
        bottom: 5px;
        padding: 0 !important;
        background: transparent;
    }

    .list-wrap {
        overflow: auto;
        padding: 0px 8px !important;
    }
    .list-wrap::-webkit-scrollbar{
        width:5px;
    }

    .list-wrap::-webkit-scrollbar-thumb{
        border-width: 1px 1px 1px 2px;
        border-color: #777;
        background-color: #c9c8c8;
        border-radius: 10px;
    }

    .list-wrap::-webkit-scrollbar-track{
        border-width:0;
    }
</style>
