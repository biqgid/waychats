import Axios from "axios/index";

export default {
    state: {
        course: [],
        currency: [],
    },

    getters: {
        /**
         * Get currency
         */
        GET_CURRENCY: state => {
            return state.currency;
        },

    },

    mutations: {

        /***
         * SET currency
         *
         * @param state
         * @param payload
         */
        SET_CURRENCY: (state, payload) => {
            state.currency = payload;
        },
    },

    actions: {

        /***
         * GET currency data from server
         *
         * @param context
         */
        GET_CURRENCY: async (context) => {
            let {data} = await Axios.get('api/currency');
            context.commit('SET_CURRENCY', data);
        },
    },
}
