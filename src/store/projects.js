export default {
  state: {
    projectsList: null,
  },
  getters: {
    getProjectsList: (state) => state.projectsList,
  },
  mutations: {
    _SET_PROJECTS_LIST(state, val) { state.projectsList = val; },
  },
  actions: {
    async _updateProjectsList({ getters, commit }) {
      try {
        const projects = (await getters.getDB.ref('projects').once('value')).val() || [];
        commit('_SET_PROJECTS_LIST', Object.keys(projects).map((key) => ({ ...projects[key], id: key })));
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
};
