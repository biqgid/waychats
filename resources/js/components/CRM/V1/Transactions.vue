<template>
    <v-card color="#e4f3f7" class="item-wrap mt-4" flat>
        <v-card-title class="px-2 py-0 justify-content-between align-items-baseline item-title">
            <div class="first">
                <v-select dense
                    :items="stages"
                    item-text="name"
                    item-value="id"
                    cache-items
                    hide-selected
                    v-model="stage"
                ></v-select>
            </div>
            <div class="last position-relative">
                <div class="created">{{ transaction.created_at }}</div>
                <div class="action">
                    <v-btn flat icon color="#0d7e8c" class="m-0">
                        <v-icon size="20">bookmark_border</v-icon>
                    </v-btn>

                    <v-menu offset-y class="d-inline-block">
                        <template v-slot:activator="{ on }">
                            <v-btn flat icon color="#0d7e8c" class="m-0" v-on="on">
                                <v-icon size="20">more_vert</v-icon>
                            </v-btn>
                        </template>
                        <v-list dense>
                            <v-list-tile @click="">
                                <v-list-tile-title>Завершить</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile @click="destroy(transaction.id)">
                                <v-list-tile-title>Удолить</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile @click="">
                                <v-list-tile-title>Отправить</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                </div>
            </div>
        </v-card-title>

        <v-divider class="m-0" light></v-divider>

        <v-card-text class="px-2 py-0" v-if="typeof transaction.data === 'object'">
            <div class="row country py-2 pr-4 mx-0">
                <div class="col-6 position-relative pr-0 mr-1 first">
                    <p class="m-0 text-nowrap text-truncate"><small>{{ description.routes.location }}</small></p>
                    <div class="arrow-left position-absolute"></div>
                </div>
                <div class="col-6 position-relative last">
                    <p class="m-0 text-nowrap text-truncate"><small>{{ description.routes.destination }}</small></p>
                    <div class="arrow-left position-absolute"></div>
                    <div class="arrow-right position-absolute"></div>
                </div>
            </div>
            <div class="description mt-2">
                <div class="desc-first d-flex justify-content-between">
                    <p class="desc-p-one mb-0 font-weight-bold mr-2 text-left">Описание:</p>
                    <p class="desc-p-two mb-0 text-no-wrap text-truncate">{{ transportModel }} {{ transportCarcass }} {{ description.description }}</p>
                </div>
                <div class="desc-last d-flex justify-content-between">
                    <p class="desc-p-one mb-0 font-weight-bold mr-2 text-left" v-if="description.distance">Расстояние/Ставка:</p>
                    <p class="desc-p-one mb-0 font-weight-bold mr-2 text-left" v-else>Ставка:</p>

                    <p class="desc-p-two mb-0 text-no-wrap text-truncate text-right" v-if="description.distance">
                        <span class="distance">{{ description.distance }}</span>
                        <span class="price">{{ description.price }}$</span>
                    </p>

                    <p class="desc-p-two mb-0 text-no-wrap text-truncate text-right" v-else>
                        <span class="price">{{ description.price }}$</span>
                    </p>
                </div>
            </div>
        </v-card-text>

        <v-card-text class="px-2 py-0" v-else>
            <div class="description mt-2">
                <div class="desc-first d-flex justify-content-between">
                    <p class="desc-p-one mb-0 font-weight-bold mr-2 text-left">Описание:</p>
                    <p class="desc-p-two mb-0 text-no-wrap text-truncate" v-html="description"></p>
                </div>
                <div class="desc-last d-flex justify-content-between">
                    <p class="desc-p-one mb-0 font-weight-bold mr-2 text-left">Ставка:</p>

                    <p class="desc-p-two mb-0 text-no-wrap text-truncate text-right">
                        <span class="price">{{ transaction.price }}{{ transaction.currency }}</span>
                    </p>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "Transactions",
        props: ['transaction'],

        computed: {
            stages() {
                return this.$store.getters.GET_STAGES;
            },

            stage: {
                get() {
                    return this.transaction.stage
                },
                set(val) {
                    let data = {
                        transaction_id: this.transaction.id,
                        stage_id: val,
                    };

                    this.$store.dispatch('UPDATE_TRANSACTION_STAGE', data)
                }
            },

            description() {
                return this.transaction.data
            },

            transportModel() {
                if (this.description.transport)
                    return this.description.transport.model.join(', ')
                else if (this.description.shipment)
                    return this.description.shipment.carcass.join(', ')
            },

            transportCarcass() {
                if (this.description.transport)
                    return this.description.transport.carcass.join(', ')
                else if (this.description.shipment)
                    return this.description.shipment.carcass.join(', ')
            }
        },

        methods: {
            destroy(id) {
                this.$store.dispatch('DELETE_TRANSACTION', id)
            }
        }
    }
</script>

<style scoped>
    .item-wrap {
        border: 1px solid #0eadbe !important;
    }
    .item-title {
        height: 30px;
    }
    .created {
        position: absolute;
        width: 100px;
        right: 0px;
        text-align: right;
        font-size: 10px;
        top: -17px;
        border-radius: 5px 5px 0 0px;
        opacity: 1;
        padding: 0px 10px 0px 10px;
        background: #e6f3f7;
        border-top: 1px solid #0eadbe;
        border-left: 1px solid #0eadbe;
        border-right: 1px solid #0eadbe;
        color: #148b94;
    }

    .country {
        overflow-x: auto;
        flex-wrap: nowrap;
        padding-bottom: 3px !important;
        font-size: 16px;
    }
    .country::-webkit-scrollbar {
        height: 3px;
        border-radius: 50%;
    }
    .country::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px #fdfdfd;
    }
    .country::-webkit-scrollbar-thumb {
        background-color: #00343a;
    }
    .country > div {
        height: min-content;
    }
    .country .first {
        background: #ffc7cf;
        padding: 0 0 0 10px;
    }
    .country .first .arrow-left {
        border: 11.5px solid transparent;
        border-left-color: #ffc7cf;
        border-right: 0;
        top: 0px;
        right: -11.5px;
        z-index: 1;
    }
    .country .last {
        background: #7ec4a2;
        padding: 0 0 0 20px;
    }
    .country .last > .arrow-left {
        border: 11.5px solid transparent;
        border-left-color: #e5f3f7;
        border-right: 0;
        top: 0px;
        left: 0;
    }
    .country .last > .arrow-right {
        border: 11.5px solid transparent;
        border-left-color: #7ec4a2;
        border-right: 0;
        top: 0px;
        right: -11.05px;
        z-index: 1;
    }
    .country .middle {
        background: rgb(255, 231, 150);
        padding: 0 0 0 20px;
    }
    .country .middle > .arrow-left {
        border: 11.5px solid transparent;
        border-left-color: #e5f3f7;
        border-right: 0;
        top: 0px;
        left: 0;
    }
    .country .middle > .arrow-right {
        border: 11.5px solid transparent;
        border-left-color: rgb(255, 231, 150);
        border-right: 0;
        top: 0px;
        right: -11.05px;
        z-index: 100;
    }

    .action button {
        height: 25px;
        width: 25px;
    }

    .distance {
        font-size: 12px;
    }

    .price {
        color: red;
        margin-left: 10px;
    }
    .link-btn {
        font-size: 12px;
    }
</style>
