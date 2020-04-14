<template>
    <v-card color="#e4f3f7" class="item-wrap mt-4" flat>
        <v-card-title class="px-2 py-0 justify-content-between item-title">
            <div class="first">{{ username }}</div>
            <div class="last position-relative">
                <div class="created">{{ data.created_at }}</div>
                <div class="action">
                    <v-btn flat icon color="#0d7e8c" class="m-0">
                        <v-icon size="20">bookmark_border</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-card-title>

        <v-divider class="m-0" light></v-divider>

        <v-card-text class="px-2 py-0">
            <div class="row country py-2 pr-4 mx-0">
                <div class="col-6 position-relative pr-0 mr-1 first">
                    <p class="m-0 text-nowrap text-truncate"><small>{{ data.content.routes.location }}</small></p>
                    <div class="arrow-left position-absolute"></div>
                </div>
                <div class="col-6 position-relative middle mr-1" v-for="item in data.content.routes.intermediate">
                    <p class="m-0 text-nowrap text-truncate"><small>{{ item }}</small></p>
                    <div class="arrow-left position-absolute"></div>
                    <div class="arrow-right position-absolute"></div>
                </div>
                <div class="col-6 position-relative last" v-if="data.content.routes.destination">
                    <p class="m-0 text-nowrap text-truncate"><small>{{ data.content.routes.destination }}</small></p>
                    <div class="arrow-left position-absolute"></div>
                    <div class="arrow-right position-absolute"></div>
                </div>
            </div>
            <div class="description mt-2">
                <div class="desc-first d-flex justify-content-between">
                    <p class="desc-p-one mb-0 font-weight-bold mr-2 text-left">Описание:</p>
                    <p class="desc-p-two mb-0 text-no-wrap text-truncate">{{ transportModel }} {{ transportCarcass }} {{ data.content.description }}</p>
                </div>
                <div class="desc-last d-flex justify-content-between">
                    <p class="desc-p-one mb-0 font-weight-bold mr-2 text-left" v-if="data.content.distance">Расстояние/Ставка:</p>
                    <p class="desc-p-one mb-0 font-weight-bold mr-2 text-left" v-else>Ставка:</p>

                    <p class="desc-p-two mb-0 text-no-wrap text-truncate text-right" v-if="data.content.distance">
                        <span class="distance">{{ data.content.distance }}</span>
                        <span class="price">{{ data.content.price }}$</span>
                    </p>

                    <p class="desc-p-two mb-0 text-no-wrap text-truncate text-right" v-else>
                        <span class="price">{{ data.price }}$</span>
                    </p>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "AppTemplate",
        props: ['data',],
        computed: {
            username() {
                if (this.data.user.name)
                    return this.data.user.name
                else
                    return this.data.user.phone
            },

            transportModel() {
                if (this.data.content.transport)
                    return this.data.content.transport.model.join(', ')
                else if (this.data.content.shipment)
                    return this.data.content.shipment.model.join(', ')
            },

            transportCarcass() {
                if (this.data.content.transport)
                    return this.data.content.transport.carcass.join(', ')
                else if (this.data.content.shipment)
                    return this.data.content.shipment.carcass.join(', ')
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
        z-index: 100;
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
        z-index: 100;
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
