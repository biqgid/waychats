<template>
    <v-card class="h-100">
        <v-card-title class="p-0">
            <v-toolbar color="white" dense height="40" class="px-0">
                <v-toolbar-title class="subheading">Калькулятор</v-toolbar-title>

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
            <div class="row">
                <div class="col-12">
                    <input type="text" placeholder="0" v-model="result" class="form-control">
                </div>
                <div class="col-12">
                    <div class="row">
                        <div class="col-12">
                            <div class="row pt-3 m-0">
                                <div class="col-3 p-0 pr-1"><button class="btn w-100" id="clear-all" @click="clear">C</button></div>
                                <div class="col-3 px-1"><button class="btn w-100" id="clear-value" @click="insert">x</button></div>
                                <div class="col-3 px-1"><button class="btn w-100" id="procent" @click="action">%</button></div>
                                <div class="col-3 p-0 pl-1"><button class="btn w-100" id="divide" @click="action">/</button></div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row pt-3 m-0">
                                <div class="col-3 p-0 pr-1"><button class="btn number-btn w-100" @click="insert">7</button></div>
                                <div class="col-3 px-1"><button class="btn number-btn w-100" @click="insert">8</button></div>
                                <div class="col-3 px-1"><button class="btn number-btn w-100" @click="insert">9</button></div>
                                <div class="col-3 p-0 pl-1"><button class="btn w-100" id="increase" @click="action">*</button></div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row pt-3 m-0">
                                <div class="col-3 p-0 pr-1"><button class="btn number-btn w-100" @click="insert">4</button></div>
                                <div class="col-3 px-1"><button class="btn number-btn w-100" @click="insert">5</button></div>
                                <div class="col-3 px-1"><button class="btn number-btn w-100" @click="insert">6</button></div>
                                <div class="col-3 p-0 pl-1"><button class="btn w-100" id="minus" @click="action">-</button></div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row pt-3 m-0">
                                <div class="col-3 p-0 pr-1"><button class="btn number-btn w-100" @click="insert">1</button></div>
                                <div class="col-3 px-1"><button class="btn number-btn w-100" @click="insert">2</button></div>
                                <div class="col-3 px-1"><button class="btn number-btn w-100" @click="insert">3</button></div>
                                <div class="col-3 p-0 pl-1"><button class="btn w-100" id="plus" @click="action">+</button></div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row pt-3 m-0">
                                <div class="col-3 p-0 pr-1"><button class="btn number-btn w-100" @click="insert">,</button></div>
                                <div class="col-3 px-1"><button class="btn number-btn w-100" @click="insert">0</button></div>
                                <div class="col-3 px-1"><button class="btn number-btn w-100" @click="insert">.</button></div>
                                <div class="col-3 p-0 pl-1"><button class="btn w-100" id="result" @click="resultValue">=</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "CalculatorComponent",
        props: ['index'],

        data() {
            return {
                result: "",
                action_value: null,
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
            },
            insert(e) {
                this.result += e.target.textContent;
            },

            clear() {
                this.result = "";
            },

            action(e) {
                if (e.target.textContent === '+') {
                    this.result += e.target.textContent;
                } else if (e.target.textContent === '-') {
                    this.result += e.target.textContent;
                } else if (e.target.textContent === '*') {
                    this.result += e.target.textContent;
                } else if (e.target.textContent === '/') {
                    this.result += e.target.textContent;
                } else if (e.target.textContent === '%') {
                    this.result += e.target.textContent;
                }
            },

            resultValue(e) {
                let value = this.result;
                let result =  eval(value);

                this.result = result;
            },
        }
    }
</script>

<style scoped>
.btn {
    background: gainsboro;
}
</style>
