import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase';

import projects from './projects';
import skills from './skills';
import info from './info';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects, skills, info,
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
      dispatch('_updateProjectsList');
      dispatch('_updateSkillsList');
      dispatch('_updateAdminInfo');
      dispatch('_updateMainImage');
      dispatch('_updateBio');
    },
    async _updateDataList({ dispatch }, dir) {
      switch (dir) {
      case 'projects': await dispatch('_updateProjectsList'); break;
      case 'skills': await dispatch('_updateSkillsList'); break;
      case 'info': await dispatch('_updateAdminInfo'); break;
      default: break;
      }
    },
    async uploadData({ dispatch }, { dir, payload }) {
      try {
        await dispatch('_uploadImage', { dir, payload });
      } catch (e) {
        console.warn(e);
      }
    },
    async _saveDataInDB({ getters, dispatch }, { dir, data }) {
      try {
        await getters.getDB.ref(dir).push(data);

        await dispatch('_updateDataList', dir);
      } catch (e) {
        console.warn(e);
      }
    },
    async updateData({ dispatch }, { id, dir, payload }) {
      try {
        await dispatch('_updateImage', { id, dir, payload });
      } catch (e) {
        console.warn(e);
      }
    },
    async removeData({ dispatch }, { dir, id }) {
      try {
        const ref = await dispatch('removeImage', { dir, id });
        await ref.remove();

        await dispatch('_updateDataList', dir);
      } catch (e) {
        console.warn(e);
      }
    },
    async _uploadImage({ getters, dispatch }, { dir, payload }) {
      const ref = getters.getStorage.ref().child(`${dir}/${payload.image.name}`).put(payload.image);
      ref.on('state_changed',
        () => {},
        (error) => console.warn(error),
        () => {
          ref.snapshot.ref.getDownloadURL()
            .then((imageSrc) => {
              dispatch('_saveDataInDB', { dir, data: { ...payload, imageSrc } });
            })
            .catch((e) => console.warn(e));
        });
    },
    async _updateImage({ getters, dispatch }, { id, dir, payload }) {
      if (payload.image) {
        const ref = getters.getStorage.ref().child(`${dir}/${payload.image.name}`).put(payload.image);

        ref.on('state_changed',
          () => {},
          (error) => console.warn(error),
          () => {
            ref.snapshot.ref.getDownloadURL()
              .then((imageSrc) => {
                getters.getDB.ref(dir).child(id).update({ ...payload, imageSrc });
                dispatch('_updateDataList', dir);
              })
              .catch((e) => console.warn(e));
          });
      } else {
        await getters.getDB.ref(dir).child(id).update({ ...payload });
        await dispatch('_updateDataList', dir);
      }
    },
    async removeImage({ getters }, { dir, id }) {
      const ref = getters.getDB.ref(dir).child(id);
      try {
        const fileName = (await ref.child('imageName').once('value')).val() || '';
        const fileRef = getters.getStorage.ref().child(fileName);
        await fileRef.delete();
      } catch (e) {
        console.warn(e);
      }
      return ref;
    },
  },
});
