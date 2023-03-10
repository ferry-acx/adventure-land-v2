import Vue from 'vue';
import Vuex from 'vuex';
import pathify from './pathify';

import getters from './getters';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [pathify.plugin],
    state,
    getters,
    mutations,
    actions,
    modules
});
