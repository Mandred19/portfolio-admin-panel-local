export default {
  state: {
    skillsList: null,
  },
  getters: {
    getSkillsList: (state) => state.skillsList,
  },
  mutations: {
    _SET_SKILLS_LIST(state, val) { state.skillsList = val; },
  },
  actions: {
    async updateSkillsList({ getters, commit }) {
      try {
        const skills = (await getters.getDB.ref('skills').once('value')).val() || [];
        commit('_SET_SKILLS_LIST', Object.keys(skills).map((key) => ({ ...skills[key], id: key })));
      } catch (e) {
        console.warn(e);
      }
    },
  },
};
