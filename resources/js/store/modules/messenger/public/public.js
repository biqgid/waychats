import Axios from "axios/index";

export default {
    state: {
        publicMessages: [],
    },

    getters: {
        /**
         * toggle header in chat component
         */
        PUBLIC_MESSAGES: state => {
            return state.publicMessages
        },
    },

    mutations: {
        /***
         * Get all messages and applications
         */
        SET_PUBLIC_MESSAGES: (state, payload) => {
            state.publicMessages = payload;
        },

        /***
         * state public messages push new message
         */
        ADD_PUBLIC_MESSAGE: (state, payload) => {
            state.publicMessages.push(payload);
        },
    },

    actions: {
        /**
         * Get messages in section public messages
         *
         * @param context
         */
        GET_PUBLIC_MESSAGES: async (context) => {
            let {data} = await Axios.get('api/messages/public');
            context.commit('SET_PUBLIC_MESSAGES', data);
        },

        /**
         * Add new message
         *
         * @param context
         * @param payload
         */
        ADD_PUBLIC_MESSAGE: async (context, payload) => {
            let {data} = await Axios.post('api/messages/public', {message: payload});
            context.commit('ADD_PUBLIC_MESSAGE', data);
        }
    },
}
