<template>
    <v-card class="h-100">
        <v-card-title class="p-0">
            <v-toolbar color="white" dense height="40" class="px-0">
                <v-toolbar-title class="subheading">Быстрый расчет</v-toolbar-title>

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
            <div class="w-100">
                <v-text-field
                    class="p-0"
                    label="$ USD"
                    @focus="getCourse(currencies[4].course)"
                    v-model="usd"
                    @input="paymentUSD($event)"
                ></v-text-field>
            </div>
            <div class="w-100">
                <v-text-field
                    class="p-0"
                    label="€ EUR"
                    @focus="getCourse(currencies[3].course)"
                    v-model="eur"
                    @input="paymentEUR($event)"
                ></v-text-field>
            </div>
            <div class="w-100">
                <v-text-field
                    class="p-0"
                    label="₽ RUB"
                    @focus="getCourse(currencies[2].course)"
                    v-model="rub"
                    @input="paymentRUB($event)"
                ></v-text-field>
            </div>
            <div class="w-100">
                <v-text-field
                    class="p-0"
                    label="C KGS"
                    @focus="getCourse(currencies[0].course)"
                    v-model="kgs"
                    @input="paymentKGS($event)"
                ></v-text-field>
            </div>
            <div class="w-100">
                <v-text-field
                    class="p-0"
                    label="₸ KZT"
                    @focus="getCourse(currencies[1].course)"
                    v-model="kzt"
                    @input="paymentKZT($event)"
                ></v-text-field>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "FastConverter",
        props: ['index'],
        data() {
            return {
                usd: null,
                eur: null,
                rub: null,
                kzt: null,
                kgs: null,

                course: null,
            }
        },
        mounted() {
            this.$store.dispatch('GET_CURRENCY');
        },
        computed: {
            currencies() {
                return this.$store.getters.GET_CURRENCY
            },
        },
        methods: {

            /**
             * Delete component
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
             * Hide component
             */
            hideComponent(index, value) {
                let options = {
                    index: index,
                    value: value,
                };
                this.$store.commit('TOGGLE_VISIBLE', options)
            },

            /**
             * получаем данные о курсе валют
             */
            getCourse(value) {
                this.course = value;
            },

            /**
             * result KGS course
             */
            paymentKGS(value) {
                if (value !== '') {
                    this.usd = (value / this.course[0].purchase).toFixed(2);
                    this.eur = (value / this.course[1].purchase).toFixed(2);
                    this.rub = (value / this.course[2].purchase).toFixed(2);
                    this.kzt = (value / this.course[3].purchase).toFixed(3);
                }else {
                    this.usd = '';
                    this.eur = '';
                    this.rub = '';
                    this.kzt = '';
                    this.kgs = '';
                }
            },

            /**
             * result KZT course
             */
            paymentKZT(value) {
                if (value !== '') {
                    this.usd = (value / this.course[0].purchase).toFixed(2);
                    this.eur = (value / this.course[1].purchase).toFixed(2);
                    this.rub = (value / this.course[2].purchase).toFixed(2);
                    this.kgs = (value / this.course[3].purchase).toFixed(3);
                }else {
                    this.usd = '';
                    this.eur = '';
                    this.rub = '';
                    this.kzt = '';
                    this.kgs = '';
                }
            },

            /**
             * result RUB course
             */
            paymentRUB(value) {
                if (value !== '') {
                    this.usd = (value / this.course[0].purchase).toFixed(2);
                    this.eur = (value / this.course[1].purchase).toFixed(2);
                    this.kzt = (value / this.course[2].purchase).toFixed(2);
                    this.kgs = (value / this.course[3].purchase).toFixed(3);
                }else {
                    this.usd = '';
                    this.eur = '';
                    this.rub = '';
                    this.kzt = '';
                    this.kgs = '';
                }
            },

            /**
             * result EUR course
             */
            paymentEUR(value) {
                if (value !== '') {
                    this.usd = (value * this.course[0].purchase).toFixed(2);
                    this.rub = (value * this.course[1].purchase).toFixed(2);
                    this.kzt = (value * this.course[2].purchase).toFixed(2);
                    this.kgs = (value * this.course[3].purchase).toFixed(3);
                }else {
                    this.usd = '';
                    this.eur = '';
                    this.rub = '';
                    this.kzt = '';
                    this.kgs = '';
                }
            },

            /**
             * result USD course
             */
            paymentUSD(value) {
                if (value !== '') {
                    this.eur = (value * this.course[0].purchase).toFixed(2);
                    this.rub = (value * this.course[1].purchase).toFixed(2);
                    this.kzt = (value * this.course[2].purchase).toFixed(2);
                    this.kgs = (value * this.course[3].purchase).toFixed(3);
                }else {
                    this.usd = '';
                    this.eur = '';
                    this.rub = '';
                    this.kzt = '';
                    this.kgs = '';
                }
            },
        }
    }
</script>

<style scoped>

</style>
