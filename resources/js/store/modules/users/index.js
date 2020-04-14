export default {
    state: {
        user: null,
    },

    getters: {
        USER: state => {
            return state.user;
        }
    },

    mutations: {
        USER: (state, payload) => {
            state.adverts = payload;
        },
    },

    actions: {
        USER: async (context, payload) => {
            let {data} = await Axios.get('/adverts');
            context.commit('ADVERTS', data);
        },
    },
}
