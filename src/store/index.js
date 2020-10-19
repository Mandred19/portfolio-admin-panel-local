import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase';

import projects from './projects';
import skills from './skills';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects, skills,
  },
  state: {
    db: null,
    storage: null,
  },
  getters: {
    getDB: (state) => state.db,
    getStorage: (state) => state.storage,
  },
  mutations: {
    _SET_DB(state) { state.db = firebase.database(); },
    _SET_STORAGE(state) { state.storage = firebase.storage(); },
  },
  actions: {
    initApp({ commit, dispatch }) {
      commit('_SET_DB');
      commit('_SET_STORAGE');
      dispatch('updateProjectList');
      dispatch('updateSkillsList');
    },
  },
});
