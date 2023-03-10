import { make } from 'vuex-pathify';

const state = {
    list: [],
    active: {
        userId: '',
        fullname: '',
        gender: '',
        name: ''
    }
};

export default {
    namespaced: true,
    state,
    getters: make.getters(state),
    mutations: make.mutations(state),
    actions: {
        ...make.actions(state),
        resetConfig({ commit, state }) {
            const active = {
                userId: '',
                fullname: '',
                gender: '',
                name: ''
            };

            commit('SET_ACTIVE', active);
        },
        setConfigActive({ commit, state }, active) {
            commit('SET_ACTIVE', active);
        }
    }
};
