export default {
  state: {
    adminInfo: null,
    mainImage: null,
    bio: null,
  },
  getters: {
    getAdminInfo: (state) => state.adminInfo,
    getMainImage: (state) => state.mainImage,
    getBio: (state) => state.bio,
  },
  mutations: {
    _SET_ADMIN_INFO(state, val) { state.adminInfo = val; },
    _SET_MAIN_IMAGE(state, val) { state.mainImage = val; },
    _SET_BIO(state, val) { state.bio = val; },
  },
  actions: {
    async _updateAdminInfo({ getters, commit }) {
      try {
        const info = (await getters.getDB.ref('info').once('value')).val() || [];
        commit('_SET_ADMIN_INFO', Object.keys(info).map((key) => ({ ...info[key], id: key })));
      } catch (e) {
        console.warn(e);
      }
    },
    async _updateMainImage({ getters, commit }) {
      try {
        const image = (await getters.getDB.ref('image').once('value')).val() || {};
        commit('_SET_MAIN_IMAGE', image);
      } catch (e) {
        console.warn(e);
      }
    },
    async _updateBio({ getters, commit }) {
      try {
        const bio = (await getters.getDB.ref('bio').once('value')).val() || {};
        commit('_SET_BIO', bio);
      } catch (e) {
        console.warn(e);
      }
    },
    async _updateMainInfoList({ dispatch }, dir) {
      switch (dir) {
      case 'image': await dispatch('_updateMainImage'); break;
      case 'bio': await dispatch('_updateBio'); break;
      default: break;
      }
    },
    async updateMainInfo({ dispatch }, { dir, payload }) {
      try {
        await dispatch('_updateMainInfoFile', { dir, payload });
      } catch (e) {
        console.warn(e);
      }
    },
    async _saveMainInfoInDB({ getters, dispatch }, { dir, data }) {
      try {
        await getters.getDB.ref(dir).set(data);

        await dispatch('_updateMainInfoList', dir);
      } catch (e) {
        console.warn(e);
      }
    },
    async _updateMainInfoFile({ getters, dispatch }, { dir, payload }) {
      const ref = getters.getStorage.ref().child(`${dir}/${payload.file.name}`).put(payload.file);
      ref.on('state_changed',
        () => {},
        (error) => console.warn(error),
        () => {
          ref.snapshot.ref.getDownloadURL()
            .then((fileSrc) => {
              dispatch('_saveMainInfoInDB', { dir, data: { ...payload, fileSrc } });
            })
            .catch((e) => console.warn(e));
        });
    },
    async removeMainInfoFile({ getters }, { dir }) {
      const ref = getters.getDB.ref(dir);
      try {
        const fileName = (await ref.child('fileName').once('value')).val() || '';
        const fileRef = getters.getStorage.ref().child(fileName);
        await fileRef.delete();
      } catch (e) {
        console.warn(e);
      }
      return ref;
    },
  },
};
