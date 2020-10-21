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
        const image = (await getters.getDB.ref('main-image').once('value')).val() || [];
        commit('_SET_MAIN_IMAGE', Object.keys(image).map((key) => ({ ...image[key], id: key })));
      } catch (e) {
        console.warn(e);
      }
    },
    async _updateBio({ getters, commit }) {
      try {
        const bio = (await getters.getDB.ref('bio').once('value')).val() || [];
        commit('_SET_BIO', Object.keys(bio).map((key) => ({ ...bio[key], id: key })));
      } catch (e) {
        console.warn(e);
      }
    },
  },
};
