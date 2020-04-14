<template>
    <div class="wrap w-100" id="add-transport-form">
        <v-flex xs12 md12 lg12 xl12 class="px-3">
            <v-breadcrumbs :items="route" class="px-0 pb-2 pt-0">
                <template v-slot:divider>
                    <v-icon>chevron_right</v-icon>
                </template>
            </v-breadcrumbs>
        </v-flex>
        <v-flex xs12 md12 lg12 xl12>
            <v-layout class="m-0">
                <v-flex class="px-3" md3 lg3 xl3 xs3 sm3>
                    <datepicker class="datepicker" placeholder="Дата погрузки" :language="languages[language]" v-model="data.created_at"></datepicker>
                </v-flex>
                <v-flex class="px-3" md3 lg3 xl3 xs3 sm3>
                    <div class="d-flex justify-content-between align-items-end">
                        <label class="mb-0 label-font-my-style">Радиус погрузки</label>
                        <div class="range-value"><small class="text-red">{{ data.loading_radius }} км.</small></div>
                    </div>
                    <input type="range" min="1" max="300" v-model="data.loading_radius" name="loading_radius" class="slider">
                </v-flex>
                <v-flex class="px-3" md3 lg3 xl3 xs3 sm3>
                    <datepicker class="datepicker" placeholder="Дата выгрузки" :language="languages[language]" v-model="data.deleted_at"></datepicker>
                </v-flex>
                <v-flex class="px-3" md3 lg3 xl3 xs3 sm3>
                    <div class="d-flex justify-content-between align-items-end">
                        <label class="mb-0 label-font-my-style">Радиус выгрузки</label>
                        <div class="range-value"><small class="text-red">{{ data.discharge_radius }} км.</small></div>
                    </div>
                    <input type="range" min="1" max="300" v-model="data.discharge_radius" name="loading_radius" class="slider">
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex>
            <v-layout class="m-0 mt-3">
                <v-flex class="px-3 m-design-input position-relative" md3 lg3 xl3 xs3 sm3>
                    <input class="form-control-sm input-wager" type="text" v-model="data.shipment.weight" required>
                    <span class="bar"></span>
                    <label>Вес</label>
                </v-flex>

                <v-flex class="px-3 m-design-input position-relative" md3 lg3 xl3 xs3 sm3>
                    <input class="form-control-sm input-wager" type="text" v-model="data.shipment.length" required>
                    <span class="bar"></span>
                    <label>Длина</label>
                </v-flex>

                <v-flex class="px-3 m-design-input position-relative" md3 lg3 xl3 xs3 sm3>
                    <input class="form-control-sm input-wager" type="text" v-model="data.shipment.width" required>
                    <span class="bar"></span>
                    <label>Ширина</label>
                </v-flex>

                <v-flex class="px-3 m-design-input position-relative" md3 lg3 xl3 xs3 sm3>
                    <input class="form-control-sm input-wager" type="text" v-model="data.shipment.height" required>
                    <span class="bar"></span>
                    <label>Высота</label>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs12 md12 lg12 xl12>
            <v-layout class="m-0 mt-3">
                <v-flex class="px-3" md3 lg3 xl3 xs3 sm3>
                    <v-select
                        v-model="data.shipment.model"
                        :items="optionCars"
                        :menu-props="{ maxHeight: '300' }"
                        label="Тип авто"
                        class="m-0 p-0 cars-options"
                        multiple
                        persistent-hint
                    ></v-select>
                </v-flex>
                <v-flex class="px-3" md3 lg3 xl3 xs3 sm3>
                    <v-select
                        v-model="data.shipment.carcass"
                        :items="optionLoading"
                        :menu-props="{ maxHeight: '300' }"
                        label="Вид загрузки"
                        class="m-0 p-0 cars-options"
                        multiple
                        persistent-hint
                    ></v-select>
                </v-flex>
                <v-flex class="px-3 m-design-input position-relative" md3 lg3 xl3 xs3 sm3>
                    <input class="form-control-sm input-wager" type="text" v-model="data.price" required>
                    <span class="bar"></span>
                    <label>Ставка</label>
                    <div class="select" id="currency">
                        <select v-model="data.currency">
                            <option value="$" selected>$</option>
                        </select>
                        <v-icon class="v-icon">arrow_drop_down</v-icon>
                    </div>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 md12 lg12 xl12>
            <v-layout>
                <v-flex xs2 class="pl-3">
                    <p class="text-left body-2 my-color">Способ оплаты:</p>
                </v-flex>
                <v-flex xs10 class="text-left">
                    <v-checkbox
                        v-model="data.payment_method"
                        label="На карту"
                        class="m-0 mr-3 p-0 payment-method d-inline-block"
                        color="#128a93"
                        value="На карту"
                        hide-details
                    ></v-checkbox>

                    <v-checkbox
                        v-model="data.payment_method"
                        label="Предоплата"
                        class="m-0 mr-3 p-0 payment-method d-inline-block"
                        color="#128a93"
                        value="Предоплата"
                        hide-details
                    ></v-checkbox>

                    <v-checkbox
                        v-model="data.payment_method"
                        label="Наличные"
                        class="m-0 mr-3 p-0 payment-method d-inline-block"
                        color="#128a93"
                        value="Наличные"
                        hide-details
                    ></v-checkbox>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 md12 lg12 xl12 class="px-3 d-flex">
            <p class="body-2 text-left my-color d-inline-block mr-2">Примечание:</p>
            <v-textarea
                rows="3"
                name="input-7-4"
                class="w-100 m-0 p-0"
                v-model="data.description"
            ></v-textarea>
        </v-flex>
        <v-flex xs12 md12 lg12 xl12 class="px-3 d-flex">
            <button class="btn btn-sm w-100 action m-0" @click="send">Разместить</button>
        </v-flex>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import * as lang from "vuejs-datepicker/src/locale";
    export default {
        name: "AddShipmentsForm",
        props: ['routeList'],
        components: { Datepicker,},
        data() {
            return {
                language: "ru",
                languages: lang,

                data: {
                    routes: null,
                    created_at: null,
                    deleted_at: null,
                    loading_radius: 0,
                    discharge_radius: 0,
                    price: null,
                    currency: '$',
                    distance:null,
                    description: null,
                    plus_days: null,
                    payment_method: [],
                    shipment: {
                        model: [],
                        carcass: [],
                        width: null,
                        height: null,
                        weight: null,
                        length: null,
                    },
                },

                optionCars: [
                    'тентованный',
                    'фургон',
                    'цельнометалл',
                    'изотермический',
                    'рефрижератор',
                    'реф. мультирежимный',
                    'реф. с перегородкой',
                    'реф.-тушевоз',
                    'бортовой',
                    'открытый конт.',
                    'площадка без бортов',
                    'самосвал',
                    'шаланда',
                    'низкорамный',
                    'низкорам.платф.',
                    'телескопический',
                    'трал',
                    'балковоз(негабарит)',
                    'автобус',
                    'автовоз',
                    'автовышка',
                    'автотранспортер',
                    'бетоновоз',
                    'битумовоз',
                    'бензовоз',
                    'вездеход',
                    'газовоз',
                    'зерновоз',
                    'коневоз',
                    'конт.площадка',
                    'кормовоз',
                    'кран',
                    'лисовоз',
                    'ломовоз',
                    'манипулятор',
                    'микроавтобус',
                    'муковоз',
                    'панелевоз',
                    'пикап',
                    'пухтовоз',
                    'пирамида',
                    'рулоновоз',
                    'седельный тягач',
                    'скотовоз',
                    'стикловоз',
                    'трубовоз',
                    'цементовоз',
                    'цистерна',
                    'шеповоз',
                    'эвакуатор',
                    'грузопассажирский',
                ],
                optionLoading: [
                    'Верхняя',
                    'Боковая',
                    'Задняя',
                    'с двух боков',
                    'растентовка',
                    'гидроборт',
                    'полная растентовка',
                    'с бортами',
                    'с кониками',
                    'с обрешеткой',
                    'со снятием полных стоек',
                    'со снятием поперечных перекладин',
                ],

            }
        },
        computed: {
            route() {

                this.data.routes = this.routeList;
                this.data.distance = this.routeList.distance;

                let route = [];

                if(this.routeList.location)
                    route.push({text: this.routeList.location});

                if (this.routeList.destination)
                    route.push({text: this.routeList.destination}, {text: this.routeList.distance});

                return route
            }
        },
        methods: {
            send() {
                let object = {
                    name: null,
                    price: this.data.price,
                    currency: this.data.currency,
                    data: this.data,
                };
                this.$store.dispatch('ADD_ADVERT_SHIPMENT', this.data);
                this.$store.dispatch('ADD_PUBLIC_MESSAGE', this.data);
                this.$store.dispatch('ADD_TRANSACTIONS', object)
            }
        }
    }
</script>

<style scoped>
    .action {
        background: #128a93;
        cursor: pointer;
        font: bold 13px arial;
        padding: 8px 8px;
        color: #fff;
        border: none;
        margin: 5px;
        border-radius: 3px;
        -webkit-box-shadow: 0px 1px 0px #075e79, 0px 2px 0px #0a7083, 0px 4px 6px rgba(0, 0, 0, .6);
        box-shadow: 0px 1px 0px #075e79, 0px 2px 0px #0a7083, 0px 4px 6px rgba(0, 0, 0, .6);
        -webkit-transition: ease .15s all;
        transition: ease .15s all;
    }
    .action::-moz-focus-inner{border:0}
    .action:hover {
        box-shadow: inset 0 1px #139faa, inset 1px 0 #0b8089, inset -1px 0 #128a93, inset 0 -1px #128a93, 0 2px #128a93, 0 3px #A5A5A5, 0 4px 2px rgba(0,0,0,0.4);
        background: -moz-linear-gradient(top, #109aa4 0%, #0ea5b0 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#109aa4), color-stop(100%,#0ea5b0));
        background: -o-linear-gradient(top, #109aa4 0%,#0ea5b0 100%);
        background: -ms-linear-gradient(top, #109aa4 0%,#0ea5b0 100%);
        background: linear-gradient(top, #109aa4 0%,#0ea5b0 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#109aa4', endColorstr='#0ea5b0',GradientType=0 );
        background-color: #129da8;

    }
    .action:active {
        top: 0px;
        border: 1px solid #B9B9B9;
        border-top: 1px solid #797979;
        border-bottom: 1px solid #15abb6;
        background: #128a93;
        box-shadow: inset 0 1px 2px #0d777f;
    }
    .action:focus {
        outline: none;
    }
    /* The slider itself */
    .slider {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%;
        height: 2px;
        border-radius: 10px;
        background: #04617b;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        -webkit-transition: opacity .2s;
        transition: opacity .2s;
        display: block;
        margin-top: 5px;
    }

    /* Mouse-over effects */
    .slider:hover {
        opacity: 1; /* Fully shown on mouse-over */
    }

    /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
    .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #0e7787;
        cursor: pointer;
    }

    .slider::-moz-range-thumb {
        width: 25px; /* Set a specific slider handle width */
        height: 25px; /* Slider handle height */
        background: #4CAF50; /* Green background */
        cursor: pointer; /* Cursor on hover */
    }

    .range-value {
        font-size: 14px;
        color: #888888;
    }

    #unit-cars {
        position: absolute;
        right: 15px;
        top: 11px;
        width: 40px;
        display: flex;
        align-items: center;
    }
    #unit-cars select{
        width: 100%;
        z-index: 6;
    }
    #unit-cars .v-icon{
        position: absolute;
        right: 0;
    }

    #currency {
        position: absolute;
        right: 15px;
        top: 11px;
        width: 40px;
        display: flex;
        align-items: center;
    }
    #currency select{
        width: 100%;
        z-index: 6;
    }
    #currency .v-icon{
        position: absolute;
        right: 0;
    }

</style>
