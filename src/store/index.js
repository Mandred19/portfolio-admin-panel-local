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
    downloadPhotosRefs() {

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
