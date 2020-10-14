import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase';

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
    async uploadProject({ dispatch }, project) {
      try {
        await dispatch('uploadImage', { dir: 'projects', project });
      } catch (e) {
        console.warn(e);
      }
    },
    async saveProjectInDB({ getters, dispatch }, project) {
      try {
        await getters.getDB.ref('/projects').push(project);
        await dispatch('downloadProjects');
      } catch (e) {
        console.warn(e);
      }
    },
    uploadImage({ getters, dispatch }, { dir, project }) {
      const ref = getters.getStorage.ref().child(`${dir}/${project.image.name}`).put(project.image);
      ref.on('state_changed',
        () => {},
        (error) => console.warn(error),
        () => {
          ref.snapshot.ref.getDownloadURL()
            .then((imageSrc) => {
              dispatch('saveProjectInDB', { ...project, imageSrc });
            });
        });
    },
    /* async downloadProjectImages({ getters, commit }) {
      const ref = getters.getStorage.ref().child('project');
      const list = await ref.listAll();
      commit('_SET_PROJECT_IMAGES', list);
    },
    async downloadImage({ getters }, { dir, imageSrc }) {
      const ref = getters.getStorage.ref(`${dir}/${imageSrc}`);
      try {
        const url = await ref.getDownloadURL();
        const data = await axios.get(url);
        return data.config.url;
      } catch (e) {
        console.warn(e);
        return e;
      }
    }, */
  },
});
