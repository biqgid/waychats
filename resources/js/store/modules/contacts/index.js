import Axios from "axios/index";

export default {

    state: {
        contacts: [],
    },

    getters: {

        /**
         * get user contacts all
         */
        CONTACTS: state => {
            return state.contacts
        },
    },

    mutations: {
        /**
         * set state user contacts all
         */
        CONTACTS: (state, payload) => {
            state.contacts = payload;
        },

        /**
         * add state contacts new contact
         */
        ADD_CONTACT: (state, payload) => {
            state.contacts = payload;
        },
    },

    actions: {
        CONTACTS: async (context, payload) => {
            let {data} = await Axios.get('api/contacts');
            context.commit('CONTACTS', data.data);
        },

        ADD_CONTACT: async (context, payload) => {
            let {data} = await Axios.post('api/contacts', payload);
            context.commit('ADD_CONTACT', data);
        },
    },
}
