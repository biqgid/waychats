import Axios from "axios/index";

export default {

    state: {
        transactions: [],
        stages: [],

        snackbar: {
            isVisible: false,
            text: null,
        }
    },

    getters: {

        /**
         * GET TRANSACTIONS
         *
         * @param state
         */
        GET_TRANSACTIONS: state => {
            return state.transactions
        },

        /**
         * GET STAGES
         *
         * @param state
         */
        GET_STAGES: state => {
            return state.stages
        },

        /**
         * GET CNACKBAR
         *
         * @param state
         */
        GET_SNACKBAR: state => {
            return state.snackbar
        },

    },

    mutations: {

        /***
         * SEND TRANSACTIONS DATA TO CLIENT
         *
         * @param state
         * @param payload
         */
        ADD_STAGE: (state, payload) => {
            state.stages.push(payload)
        },

        /***
         * SET TRANSACTIONS DATA TO CLIENT
         *
         * @param state
         * @param payload
         */
        ADD_TRANSACTIONS: (state, payload) => {
            state.transactions.push(payload);
            state.snackbar.text = 'Заявка успешно создана';
            state.snackbar.isVisible = true;
        },

        // -------------------------------------------------------

        /***
         * SET STAGES IN STATE STAGES
         *
         * @param state
         * @param payload
         */
        SET_STAGES: (state, payload) => {
            state.stages = payload
        },

        /***
         * SET TRANSACTIONS IN STATE TRANSACTIONS
         *
         * @param state
         * @param payload
         */
        SET_TRANSACTIONS: (state, payload) => {
            state.transactions = payload
        },

        /***
         * DELETE TRANSACTION
         *
         * @param state
         * @param id
         */
        DELETE_TRANSACTION: (state, id) => {
            let index = state.transactions.findIndex(function(element) {
                return element.id === id;
            });
            state.transactions.splice(index, 1);
            state.snackbar.text = 'Заявка успешно удолена';
            state.snackbar.isVisible = true;
        },

        /**
         * SEL VALUE IN CNACKBAR STATE
         *
         * @param state
         * @param payload
         */
        SET_SNACKBAR: (state, payload) => {
            state.snackbar.isVisible = payload
        }

    },

    actions: {
        /***
         * GET STAGES DATA TO SERVER
         *
         * @param context
         * @param payload
         */
        GET_STAGES: async (context, payload) => {
            let {data} = await Axios.get('/api/dealings/stage');
            context.commit('SET_STAGES', data.data);
        },

        /***
         * GET TRANSACTIONS DATA TO SERVER
         *
         * @param context
         * @param payload
         */
        GET_TRANSACTIONS: async (context, payload) => {
            let {data} = await Axios.get('/api/dealings/transactions');
            context.commit('SET_TRANSACTIONS', data);
        },

        // -------------------------------------------------------

        /***
         * SEND STAGE DATA TO SERVER
         *
         * @param context
         * @param payload
         */
        ADD_STAGE: async (context, payload) => {
            let {data} = await Axios.post('/api/dealings/stage', payload);
            context.commit('ADD_STAGE', data);
        },

        /***
         * SEND TRANSACTIONS DATA TO SERVER
         *
         * @param context
         * @param payload
         */
        ADD_TRANSACTIONS: async (context, payload) => {
            let {data} = await Axios.post('/api/dealings/transactions', payload);
            context.commit('ADD_TRANSACTIONS', data);
        },

        /***
         * UPDATE TRANSACTION STAGE
         *
         * @param context
         * @param payload
         */
        UPDATE_TRANSACTION_STAGE: async (context, payload) => {
            let {data} = await Axios.post(`/api/dealings/transactions/stage-update`, payload);
        },

        /***
         * DELETE TRANSACTION
         *
         * @param context
         * @param id
         */
        DELETE_TRANSACTION: async (context, id) => {
            await Axios.delete(`/api/dealings/transactions/delete/${id}`).then(response => {
                if (response.status === 204)
                    context.commit('DELETE_TRANSACTION', id);
            });
        }
    },
}
