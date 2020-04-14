<template>
    <v-card color="#e4f3f7" class="item-wrap mt-4" flat>
        <v-card-title class="px-2 py-0 justify-content-between align-items-center item-title">
            <div class="first">
                {{ transaction.created_at }}
            </div>
            <div class="last position-relative">
                <div class="action">
                    <v-btn flat icon color="#0d7e8c" class="m-0">
                        <v-icon size="20">bookmark_border</v-icon>
                    </v-btn>
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

        data() {
            return {
                select: null,
                items: ['Первичный этап', 'Новый этап', 'Старый этап','Промежуточный этап']
            }
        },

        computed: {

            description() {
                return this.transaction.data
            },

            transportModel() {
                if (this.description.transport)
                    return this.description.transport.model.join(', ')
            },

            transportCarcass() {
                if (this.description.transport)
                    return this.description.transport.carcass.join(', ')
            }
        }
    }
</script>

<style scoped>
    .list-wrap {
        height: 100%;
        overflow: auto;
        padding: 0px 8px;
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
        top: -19px;
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

    .action > button {
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
