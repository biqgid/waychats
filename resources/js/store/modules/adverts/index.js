import Axios from "axios/index";

export default {

    state: {
        adverts: [],
    },

    getters: {

        /**
         * toggle header in chat component
         */
        GET_ADVERTS: state => {
            return state.adverts
        },

    },

    mutations: {
        /***
         * Get all messages and applications
         */
        ADD_ADVERT: (state, payload) => {
            state.adverts.push(payload);
        },
    },

    actions: {
        ADD_ADVERT: async (context, payload) => {
            let {data} = await Axios.post('api/adverts/add/transport', payload);
            context.commit('ADD_MAPS_DATA', data);
            context.commit('ADD_ADVERT', data);
        },

        ADD_ADVERT_SHIPMENT: async (context, payload) => {
            let {data} = await Axios.post('api/adverts/add/shipment', payload);
            context.commit('ADD_MAPS_DATA', data);
            context.commit('ADD_ADVERT', data);
        },

        SEARCH_ADVERTS: async (context, payload) => {
            let {data} = await Axios.post(`/api/adverts/${payload.path}`, payload);
            context.commit('SET_MAPS_DATA', data.data);
            context.commit('UPDATE_DRAWER', true);
        }
    },
}
