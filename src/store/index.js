import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
  },
  state: {
    storage: null,
  },
  getters: {
    getStorage: (state) => state.storage,
  },
  mutations: {
    _SET_STORAGE(state) {
      state.storage = firebase.storage();
    },
  },
  actions: {
    createStorage({ commit }) {
      commit('_SET_STORAGE');
    },
  },
});
