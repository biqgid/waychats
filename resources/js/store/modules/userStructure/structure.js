import Axios from "axios/index";

export default {
    state: {
        /**
         * Интерфейс сайта по умолчанию
         */
        defaultStructure: [
            {
                is_visible: true,
                is_opened: true,
                name: 'developments',
                isDraggable: true,
                isResizable: true,
                is_static: false,
                dragAllowFrom: null,
                icon: 'apps',
                title: 'Инструменты',
                x : 0,
                y : 4.5,
                w : 6,
                h : 10,
                i : 1,
            },
            {
                is_visible: true,
                is_opened: true,
                name: 'map-component',
                isDraggable: true,
                isResizable: true,
                is_static: false,
                dragAllowFrom: null,
                icon: 'map',
                title: 'Карта',
                x : 0,
                y : 10,
                w : 6,
                h : 64.4,
                i : 2,
            },
            {
                is_visible: true,
                is_opened: true,
                name: 'mini-c-r-m',
                isDraggable: true,
                isResizable: true,
                is_static: false,
                dragAllowFrom: null,
                icon: 'category',
                title: 'СRМ-система',
                x : 6,
                y : 0,
                w : 3,
                h : 79,
                i : 3,
            },
            {
                is_visible: true,
                is_opened: true,
                name: 'messenger',
                isDraggable: true,
                isResizable: true,
                is_static: false,
                dragAllowFrom: null,
                icon: 'local_post_office',
                title: 'Мессенджер',
                x : 9,
                y : 0,
                w : 3,
                h : 79,
                i : 4,
            },
            {
                is_visible: true,
                is_opened: true,
                name: 'calculator',
                isDraggable: true,
                isResizable: true,
                is_static: false,
                dragAllowFrom: null,
                icon: 'fas fa-calculator',
                title: 'Калькулятор',
                x : 0,
                y : 64.4,
                w : 2,
                h : 31.5,
                i : 5,
            },
            {
                is_visible: true,
                is_opened: true,
                name: 'converter',
                isDraggable: true,
                isResizable: true,
                is_static: false,
                dragAllowFrom: null,
                icon: 'swap_horiz',
                title: 'Конвертер валют',
                x : 2,
                y : 64.4,
                w : 2,
                h : 31.5,
                i : 6,
            },

            {
                is_visible: true,
                is_opened: true,
                name: 'fast-converter',
                isDraggable: true,
                isResizable: true,
                is_static: false,
                dragAllowFrom: null,
                icon: 'autorenew',
                title: 'Быстрый расчет',
                x : 4,
                y : 64.4,
                w : 2,
                h : 31.5,
                i : 7,
            },
        ],

        /**
         * Пользовательский интерфейс сайта
         */
        userStructure: [],
    },

    getters: {
        /**
         * Get site structure
         * userStructure
         */
        GET_USER_STRUCTURE: state => {
            return state.userStructure
        },

        /**
         * Get site structure
         * defaultStructure
         */
        GET_DEFUALT_STRUCTURE: state => {
            return state.defaultStructure
        },

    },

    mutations: {

        /***
         * SET in state userStructure user site structure
         *
         * @param state
         * @param payload
         */
        SET_STRUCTURE: (state, payload) => {
            state.userStructure = payload;
        },

        /**
         * Toggle visible components
         */
        TOGGLE_VISIBLE: (state, payload) => {
            if (state.userStructure) {
                state.userStructure[payload.index].is_visible = payload.value;
            }else {
                state.defaultStructure[payload.index].is_visible = payload.value;
            }
        },

        /**
         * Close components
         */
        CLOSE_COMPONENT: (state, payload) => {
            if (state.userStructure) {
                state.userStructure[payload.index].is_opened = payload.value;
            }else {
                state.defaultStructure[payload.index].is_opened = payload.value;
            }
        },

        /**
         * change height component
         */
        CHANGE_HEIGHT: (state, payload) => {
            if (state.userStructure) {
                state.userStructure[payload.index].h = payload.value;
                state.userStructure[payload.index + 1].y = payload.value + 4.5;
            }else {
                state.defaultStructure[payload.index].h = payload.value;
                state.defaultStructure[payload.index + 1].y = payload.value + 4.5;
            }
        }
    },

    actions: {

        /***
         * GET user site structure
         *
         * @param context
         */
        GET_STRUCTURE: async (context) => {
            let {data} = await Axios.get('api/structure');
            context.commit('SET_STRUCTURE', data.structure);
        },

        /***
         * update user site structure
         *
         * @param context
         * @param payload
         */
        UPDATE_STRUCTURE: async (context, payload) => {
            let {data} = await Axios.post('api/structure/update', {structure: payload});
        },

        /***
         * close component
         *
         * @param context
         * @param payload
         */
        CLOSE_COMPONENT: async (context, payload) => {
            let {data} = await Axios.post('api/structure/close-component', payload);
        }
    },
}
