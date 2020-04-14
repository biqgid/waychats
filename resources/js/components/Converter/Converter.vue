<template>
    <v-card class="h-100">
        <v-card-title class="p-0">
            <v-toolbar color="white" dense height="40" class="px-0">
                <v-toolbar-title class="subheading">Конвертер валют</v-toolbar-title>

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
        <v-card-text>
            <v-layout>
                <v-flex xs8>
                    <v-text-field
                        label="Сумма"
                        v-model="amount"
                    ></v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-select
                        v-model="variant"
                        :items="items"
                        label="Покупка"
                    ></v-select>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs4>
                    <v-select
                        :items="currencies"
                        item-text="icon"
                        label="Валюта"
                        class="p-0 m-0"
                        return-object
                        @change="getCurrencyFrom"
                    ></v-select>
                </v-flex>
                <v-flex xs2>
                    <v-icon>
                        swap_horiz
                    </v-icon>
                </v-flex>
                <v-flex xs6>
                    <v-select
                        :items="toCarrenciessItems"
                        item-text="icon"
                        label="Конвертировать в"
                        class="p-0 m-0"
                        return-object
                        @change="getCurrencyTo"
                        :disabled="!hasCurrency()"
                    ></v-select>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12><span class="subheading text-danger">Итог: {{ result }}</span></v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Converter",
        props: ['index'],
        data: () => ({
            amount: null,
            variant: 'Покупка',
            items: ['Покупка', 'Продажа'],
            fromCurrency: null,
            toCurrency: null,
            toCarrenciessItems: null,

        }),
        mounted() {
            this.$store.dispatch('GET_CURRENCY');
        },
        computed: {
            currencies() {
                return this.$store.getters.GET_CURRENCY
            },

            result() {
                if (this.fromCurrency && this.toCurrency) {
                    if (this.variant === 'Покупка')
                        return (this.amount / this.toCurrency.purchase).toFixed(3);
                    else
                        return (this.amount / this.toCurrency.sale).toFixed(3);
                }
            }
        },
        methods: {
            /**
             * delete component
             */
            closeComponent(index, value) {
                this.$store.commit('CLOSE_COMPONENT', {index, value});
                let options = {
                    structure: this.$store.getters.GET_USER_STRUCTURE ? this.$store.getters.GET_USER_STRUCTURE : this.$store.getters.GET_DEFUALT_STRUCTURE,
                    index: index,
                    value: value,
                };
                this.$store.dispatch('CLOSE_COMPONENT', options)
            },

            /**
             * hide component
             */
            hideComponent(index, value) {
                let options = {
                    index: index,
                    value: value,
                };
                this.$store.commit('TOGGLE_VISIBLE', options)
            },

            getCurrencyFrom(value) {
                this.fromCurrency = value;
                this.toCarrenciessItems = value.course;
            },

            getCurrencyTo(value) {
                this.toCurrency = value;
            },

            hasCurrency() {
                if (this.fromCurrency)
                    return true
                else
                    return false
            }
        },


    }
</script>

<style scoped>

</style>
