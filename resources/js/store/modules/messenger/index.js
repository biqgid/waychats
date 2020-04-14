import Axios from "axios/index";

export default {
    state: {
        message: null,

        messages: [
            {
                id: 1,
                user_name: 'Salman',
                message: 'Привет Вася',
                selfMessage: true,
                created_at: '09-04-2019'
            },

            {
                id: 1,
                user_name: 'Вася',
                message: 'Привет Салман',
                selfMessage: false,
                created_at: 'сегодня в 23:36'
            },

            {
                id: 1,
                user_name: 'Виктор',
                message: 'Как дела люди',
                selfMessage: false,
                created_at: '09-04-2019'
            },

            {
                id: 1,
                user_name: 'Salman',
                message: 'нормально',
                selfMessage: true,
                created_at: 'сегодня в 23:36'
            },

            {
                id: 1,
                user_name: 'Вася',
                message: 'Зашибись',
                selfMessage: false,
                created_at: 'сегодня в 23:36'
            },

            {
                id: 1,
                user_name: 'Salman',
                message: 'Привет Вася',
                selfMessage: true,
                created_at: 'сегодня в 23:32',
            },

            {
                id: 1,
                user_name: 'Вася',
                message: 'Привет Салман',
                selfMessage: false,
                created_at: 'сегодня в 23:36'
            },

            {
                id: 1,
                user_name: 'Виктор',
                message: 'Как дела люди',
                selfMessage: false,
                created_at: 'сегодня в 23:36'
            },

            {
                id: 1,
                user_name: 'Salman',
                message: 'нормально',
                selfMessage: true,
                created_at: 'сегодня в 23:36'
            },

            {
                id: 1,
                user_name: 'Вася',
                message: 'Зашибись',
                selfMessage: false,
                created_at: 'сегодня в 23:36'
            },

            {
                id: 1,
                user_name: 'Salman',
                message: 'Привет Вася',
                selfMessage: true,
                created_at: 'сегодня в 23:36'
            },

            {
                id: 1,
                user_name: 'Вася',
                message: 'Привет Салман',
                selfMessage: false,
                created_at: 'сегодня в 23:36'
            },

            {
                id: 1,
                user_name: 'Виктор',
                message: 'Как дела люди',
                selfMessage: false,
                created_at: 'сегодня в 23:36'
            },

            {
                id: 1,
                user_name: 'Salman',
                message: 'нормально',
                selfMessage: true,
                created_at: 'сегодня в 23:36'
            },

            {
                id: 1,
                user_name: 'Вася',
                message: 'Зашибись',
                selfMessage: false,
                created_at: 'сегодня в 23:36'
            },

        ],

        public_messages: [],

        all_messages: [],

        chats: [],

        toggleSearch: false,

        chatsHeader: true,

        sections: 'chats',
    },

    getters: {

        /**
         * toggle header in chat component
         */
        CHAT_HEADER: state => {
            return state.chatsHeader
        },

        /**
         * get form variable messages
         */
        MESSAGE: state => {
            return state.message
        },

        /**
         * get public messages all
         */
        MESSAGES: state => {
            return state.all_messages
        },

        /**
         * get public messages all
         */
        ALL_MESSAGES: state => {
            return state.all_messages
        },

        /**
         * get chats
         */
        CHATS: state => {
            return state.chats
        },

        /**
         * if true show form search
         * if false hide form search
         */
        TOGGLE_SEARCH: state => {
            return state.toggleSearch
        },

        /**
         * get default chats
         * section
         */
        SECTIONS: state => {
            return state.sections+'-component'
        },

    },

    mutations: {
        /***
         * Get all messages and applications
         */
        GET_ALL_MESSAGES: (state, payload) => {
            state.all_messages = payload.data;
        },

        /***
         * Add message in state all messages and applications
         */
        ADD_ALL_MESSAGES: (state, payload) => {
            state.all_messages.push(payload);
        },

        /**
         * Set messages chats
         * set contacts where message === true
         *
         * @param state
         * @param payload
         */
        SET_CHATS: (state, payload) => {
            state.chats = payload;
        },

        /**
         * Toggle header in chat component
         *
         * @param state
         * @param payload
         */
        TOGGLE_CHAT_HEADER(state, payload) {
            state.chatsHeader = payload;
        },



        CREATE_MESSAGE: (state, payload) => {
            state.message = payload;
        },


        ADD_MESSAGE: (state, payload) => {
            state.messages.push(payload);
        },


        TOGGLE_SEARCH: (state, payload) => {
            state.toggleSearch = payload;
        },

        SECTION: (state, payload) => {
            state.sections = payload;
        },
    },

    actions: {
        GET_MESSAGES: async (context, payload) => {
            let {data} = await Axios.post('api/messages');
            context.commit('ADD_MESSAGE', payload);
        },

        /**
         * Get messages in section public messages
         *
         * @param context
         * @param payload
         */
        GET_ALL_MESSAGES: async (context, payload) => {
            let {data} = await Axios.get('api/messages/public');
            context.commit('GET_ALL_MESSAGES', data);
        },

        /**
         * Get messages chats
         * get contacts where message === true
         *
         * @param context
         * @param payload
         */
        GET_CHATS: async (context, payload) => {
            let {data} = await Axios.get('api/messages/chats');
            context.commit('SET_CHATS', data);
        },

        /**
         * Add messages in db table save
         */
        ADD_MESSAGES: async (context, payload) => {
            let {data} = await Axios.post(`api/${payload.path}`, payload.content);
            context.commit(payload.mutations, payload.content);
        },
    },
}
