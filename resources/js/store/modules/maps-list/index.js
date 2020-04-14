import Axios from "axios/index";
import MapClass from '../../../app/Map/MapClass';

export default {

    state: {
        mapsData: [],
        drawer: false,
        //mapClass: new MapClass(),
    },

    getters: {

        /**
         * get user contacts all
         */
        MAPS_DATA: state => {
            return state.mapsData
        },

        MAP_DRAWER: state => {
            return state.drawer
        }

    },

    mutations: {
        /**
         * set state user contacts all
         */
        SET_MAPS_DATA: (state, payload) => {
            //state.mapClass.addObjects(payload);
            state.mapsData = payload;
        },

        /**
         * set state user contacts all
         */
        ADD_MAPS_DATA: (state, payload) => {
            state.mapsData.push(payload);
        },

        BUILD_ROUTE: (state, payload) => {
            //state.mapClass.addObjects(payload);
            state.mapClass.buildRoute(['Бишкек', 'Москва'])
        },

        SET_ROUTE_DISTANCE: (state, payload) => {
            console.log(payload)
        },

        UPDATE_DRAWER: (state, payload) => {
            state.drawer = payload;
        },

    },

    actions: {
        GET_MAPS_DATA: async (context, payload) => {
            let {data} = await Axios.get('api/data/routes');
            context.commit('SET_MAPS_DATA', data.data);
            ymaps.ready(function () {
                MapClass.showObject(data.data);
            });
        },

    },
}
