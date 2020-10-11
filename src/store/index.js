import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase';
// import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
  },
  state: {
    storage: null,
    db: null,
    projects: null,
  },
  getters: {
    getStorage: (state) => state.storage,
    getDB: (state) => state.db,
    getProjects: (state) => state.projects,
  },
  mutations: {
    _SET_STORAGE(state) {
      state.storage = firebase.storage();
    },
    _SET_DB(state) {
      state.db = firebase.database();
    },
    _SET_PROJECTS(state, val) {
      state.projects = val;
    },
  },
  actions: {
    initApp({ commit, dispatch }) {
      commit('_SET_DB');
      commit('_SET_STORAGE');
      dispatch('downloadProjects');
    },
    async downloadProjects({ getters, commit }) {
      try {
        const projects = (await getters.getDB.ref('/projects').once('value')).val() || [];
        commit('_SET_PROJECTS', Object.keys(projects).map((key) => ({ ...projects[key], id: key })));
      } catch (e) {
        console.warn(e);
      }
    },
    async uploadProject({ getters }, project) {
      try {
        await getters.getDB.ref('/projects').push({ ...project });
      } catch (e) {
        console.warn(e);
      }
    },
    downloadPhotos(/* { getters, commit } */) {
      // const ref = getters.storage.ref('pizza.jpg');
      // ref.getDownloadURL()
      //   .then((url) => {
      //     axios.get(url)
      //       .then((data) => {
      //         this.photo = data.config.url;
      //       });
      //   })
      //   .catch((err) => console.warn(err));
    },
  },
});
