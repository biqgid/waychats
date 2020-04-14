import Axios from "axios/index";

export default {

    state: {
        private_user: null,
        private_messages: [],
        room_id: null,

        videoCall: null,
    },

    getters: {
        /**
         * get user in private chat
         */
        GET_PRIVATE_USER: state => {
            return state.private_user
        },

        /**
         * get messages in private chat
         */
        GET_PRIVATE_MESSAGES: state => {
            return state.private_messages
        },

        /**
         * get room id
         */
        GET_ROOM_ID: state => {
            return state.room_id
        },

        /**
         * get video call variable
         */
        VIDEO_CALL: state => {
            return state.videoCall
        }
    },

    mutations: {

        /***
         * Get user and record state user
         *
         * @param state
         * @param payload
         */
        SET_PRIVATE_USER: (state, payload) => {
            state.private_user = payload;
        },

        /**
         * Set messages
         */
        SET_PRIVATE_MESSAGES: (state, payload) => {
            state.private_messages = payload;
        },

        /**
         * ADD message
         */
        ADD_PRIVATE_MESSAGES: (state, payload) => {
            state.private_messages.push(payload);
        },

        /**
         * GET Room
         */
        SET_ROOM: (state, payload) => {
            state.room_id = payload.id;
        },

        /**
         * GET Room
         */
        SET_VIDEO_CALL: (state, payload) => {
            state.videoCall = payload;
        }
    },

    actions: {

        /***
         * GET user in database
         * perform mutation User
         *
         * @param context
         * @param payload
         */
        ADD_PRIVATE_USER: async (context, payload) => {
            let {data} = await Axios.post('api/messages');
            context.commit('ADD_MESSAGE', payload);
        },

        /**
         * Get messages
         */
        GET_PRIVATE_MESSAGES: async (context, payload) => {
            let {data} = await Axios.get(`api/rooms/${payload.room_id}`);
            context.commit('SET_PRIVATE_MESSAGES', data);
        },

        /**
         * add private messages
         */
        ADD_PRIVATE_MESSAGE: async (context, payload) => {
            let {data} = await Axios.post(`api/rooms/${payload.room_id}`, payload);
            context.commit('ADD_PRIVATE_MESSAGES', data);
        },

        /**
         * add room and private messages
         */
        ADD_ROOM: async (context, payload) => {
            let {data} = await Axios.post(`api/rooms`, payload);
            context.commit('ADD_PRIVATE_MESSAGES', data);
        },
    },
}
