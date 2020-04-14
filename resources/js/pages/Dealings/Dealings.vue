<template>
    <v-container fluid grid-list-md text-xs-center class="h-100 p-3">
        <v-layout row wrap class="h-100">
            <v-flex xs12>
                <v-card class="h-100 position-relative" flat color="transparent">
                    <v-card-title class="header p-0">
                        <v-toolbar solo dense color="white">
                            <v-toolbar-side-icon></v-toolbar-side-icon>
                            <v-spacer></v-spacer>

                            <v-dialog v-model="stages_form" persistent max-width="600px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="blue-grey" dark v-on="on">Добавить этап</v-btn>
                                </template>
                                <v-card id="addStageForm">
                                    <v-card-title class="py-2">
                                        <span class="headline">Добавить новый этап</span>
                                    </v-card-title>
                                    <v-divider class="m-0"></v-divider>
                                    <v-card-text class="py-1">
                                        <v-layout wrap>
                                            <v-flex xs12>
                                                <v-text-field v-model="stageFormData.name" label="Название этапа" required></v-text-field>
                                            </v-flex>
                                            <v-flex xs12>
                                                <swatches v-model="stageFormData.color"></swatches>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" flat @click="stages_form = false">Отменить</v-btn>
                                        <v-btn color="blue darken-1" flat @click="addStage">Создать</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>


                            <v-dialog v-model="transaction_form" persistent max-width="600px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" dark v-on="on">Добавить сделку</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="py-2">
                                        <span class="headline">Добавить новую сделку</span>
                                    </v-card-title>
                                    <v-divider class="m-0"></v-divider>
                                    <v-card-text class="py-1">
                                        <v-layout wrap>
                                            <v-flex xs12>
                                                <v-text-field label="Название заявки" required v-model="transactionFormData.name"></v-text-field>
                                            </v-flex>

                                            <v-flex xs8 class="pr-2">
                                                <v-text-field label="Цена" required v-model="transactionFormData.price"></v-text-field>
                                            </v-flex>

                                            <v-flex xs4>
                                                <v-select
                                                    :items="currencies"
                                                    label="Выбрать валюту"
                                                    v-model="transactionFormData.currency"
                                                ></v-select>
                                            </v-flex>

                                            <v-flex xs12>
                                                <vue-editor v-model="transactionFormData.data"></vue-editor>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" flat @click="transaction_form = false">Отмена</v-btn>
                                        <v-btn color="blue darken-1" flat @click="addTransaction">Создать</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </v-card-title>
                    <v-card-text class="content position-absolute p-0">
                        <v-layout class="h-100 m-0">
                            <stages
                                v-for="(stage, index) in stages"
                                :key="index"
                                :stage="stage">
                            </stages>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { Swatches } from 'vue-color';
    import { VueEditor } from "vue2-editor";
    import Stages from '../../components/CRM/V2/Stages';

    export default {
        name: "Dealings",

        components: {
            Swatches,
            VueEditor,
            Stages
        },

        data: () => ({
            stages_form: false,
            transaction_form: false,
            currencies: ['$', 'C'],

            stageFormData: {
                name: null,
                color: '#f12',
            },

            transactionFormData: {
                name: null,
                data: null,
                price: null,
                currency: null,
            }
        }),

        mounted() {
            this.$store.dispatch('GET_STAGES');
        },

        computed: {
            stages() {
                return this.$store.getters.GET_STAGES
            }
        },

        methods: {

            /**
             * Add stages method
             */
            addStage() {
                if (this.stageFormData.color.hex8)
                    this.stageFormData.color = this.stageFormData.color.hex8;

                this.$store.dispatch('ADD_STAGE', this.stageFormData);
            },

            /**
             * Add transactions method
             */
            addTransaction() {
                this.$store.dispatch('ADD_TRANSACTIONS', this.transactionFormData);
            }
        }
    }
</script>

<style scoped>
    .content {
        top: 60px;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
    }
</style>
