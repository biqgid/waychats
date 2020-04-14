import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import Event from '../app/Events/Event';

import Structure from './modules/userStructure/structure';

import Auth from './modules/auth';
import Messages from './modules/messenger/index';
import Contacts from './modules/contacts/index';
import Users from './modules/users/index';

import PrivateChat from './modules/messenger/private/private';
import PublicChat from './modules/messenger/public/public';

import MapsData from './modules/maps-list/index';
import Adverts from './modules/adverts/index';
import CRMSystem from './modules/crm/index';

import Currency from './modules/converter/converter';



Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: null,
        drawer: true,
        mini: true,
    },

    getters: {
        TODOS: state => {
            return state.todos;
        },

        DRAWER: state => state.drawer,
        MINI: state => state.mini,
    },

    mutations: {
        SET_TODO: (state, payload) => {
            state.todos = payload;
        },

        ADD_TODO: (state, payload) => {
            state.todos.push(payload);

            let response = 'Дело успешно создано!!!';
            Event.$emit('todo-form-modal-close', response);
        },

        DELETE_TODO: (state, payload) => {
            state.todos.splice(payload, 1);
        },

        UPDATE_TODO: (state, payload) => {
            state.todos[payload.id] = payload.data;

            let response = 'Дело успешно редоктировано!!!';
            Event.$emit('todo-form-modal-close', response);
        },
    },

    actions: {
        GET_TODO: async (context, payload) => {
            let {data} = await Axios.get('http://application.loc/api/todo');
            context.commit('SET_TODO', data);
        },

        SAVE_TODO: async (context, payload) => {
            let {data} = await Axios.post('http://application.loc/api/todo', payload).then(response => {
                context.commit('ADD_TODO', response.data);
            });
        },

        DELETE_TODO: async (context, payload) => {
            let id = context.state.todos[payload].id;
            Axios.post('api/todo/delete', {data: id}).then(response => {
                if (response.status === 204) {
                    context.commit('DELETE_TODO', payload);
                }
            })
        },

        UPDATE_TODO: (context, payload) => {
            let id = context.state.todos[payload.id].id;
            let data = {};

            Axios.post('api/todo/update', {data: payload, id: id}).then(response => {
                if (response.status === 200) {
                    data.id = payload.id;
                    data.data = response.data;
                    context.commit('UPDATE_TODO', data);
                }
            })
        },
    },

    modules: {
        auth: Auth,
        users: Users,
        messages: Messages,
        contacts: Contacts,
        private_chat: PrivateChat,
        maps_list: MapsData,
        adverts: Adverts,
        crm_system: CRMSystem,
        public_chat: PublicChat,
        structure: Structure,
        currency: Currency,
    }
});
