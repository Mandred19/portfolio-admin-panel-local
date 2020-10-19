import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
  },
  state: {
    db: null,
    storage: null,
    projects: null,
  },
  getters: {
    getDB: (state) => state.db,
    getStorage: (state) => state.storage,
    getProjects: (state) => state.projects,
  },
  mutations: {
    _SET_DB(state) { state.db = firebase.database(); },
    _SET_STORAGE(state) { state.storage = firebase.storage(); },
    _SET_PROJECT_LIST(state, val) { state.projects = val; },
  },
  actions: {
    initApp({ commit, dispatch }) {
      commit('_SET_DB');
      commit('_SET_STORAGE');
      dispatch('updateProjectList');
    },
    async updateProjectList({ getters, commit }) {
      try {
        const projects = (await getters.getDB.ref('projects').once('value')).val() || [];
        commit('_SET_PROJECT_LIST', Object.keys(projects).map((key) => ({ ...projects[key], id: key })));
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
        await getters.getDB.ref('projects').push(project);
        await dispatch('updateProjectList');
      } catch (e) {
        console.warn(e);
      }
    },
    async updateProject({ dispatch }, { id, project }) {
      try {
        await dispatch('updateImage', { id, dir: 'projects', project });
      } catch (e) {
        console.warn(e);
      }
    },
    async updateImage({ getters, dispatch }, { id, dir, project }) {
      await dispatch('removeImage', id);
      const ref = getters.getStorage.ref().child(`${dir}/${project.image.name}`).put(project.image);
      ref.on('state_changed',
        () => {},
        (error) => console.warn(error),
        () => {
          ref.snapshot.ref.getDownloadURL()
            .then((imageSrc) => {
              getters.getDB.ref('projects').child(id).update({ ...project, imageSrc });
              dispatch('updateProjectList');
            })
            .catch((e) => console.warn(e));
        });
    },
    async uploadImage({ getters, dispatch }, { dir, project }) {
      const ref = getters.getStorage.ref().child(`${dir}/${project.image.name}`).put(project.image);
      ref.on('state_changed',
        () => {},
        (error) => console.warn(error),
        () => {
          ref.snapshot.ref.getDownloadURL()
            .then((imageSrc) => {
              dispatch('saveProjectInDB', { ...project, imageSrc });
            })
            .catch((e) => console.warn(e));
        });
    },
    async removeImage({ getters }, id) {
      const ref = getters.getDB.ref('projects').child(id);
      try {
        const fileName = (await ref.child('imageName').once('value')).val() || '';
        const fileRef = getters.getStorage.ref().child(fileName);
        await fileRef.delete();
      } catch (e) {
        console.warn(e);
      }
      return ref;
    },
    async removeProject({ dispatch }, id) {
      const ref = await dispatch('removeImage', id);
      try {
        await ref.remove();
        await dispatch('updateProjectList');
      } catch (e) {
        console.warn(e);
      }
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
