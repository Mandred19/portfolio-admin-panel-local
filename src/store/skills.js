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
    async uploadSkill({ dispatch }, skill) {
      try {
        await dispatch('uploadImage', { dir: 'skills', skill });
      } catch (e) {
        console.warn(e);
      }
    },
    async saveSkillInDB({ getters, dispatch }, skill) {
      try {
        await getters.getDB.ref('skills').push(skill);
        await dispatch('updateSkillsList');
      } catch (e) {
        console.warn(e);
      }
    },
    async updateSkill({ dispatch }, { id, skill }) {
      try {
        await dispatch('updateImage', { id, dir: 'skills', skill });
      } catch (e) {
        console.warn(e);
      }
    },
    async removeSkill({ dispatch }, id) {
      const ref = await dispatch('removeImage', id);
      try {
        await ref.remove();
        await dispatch('updateSkillsList');
      } catch (e) {
        console.warn(e);
      }
    },
  },
};
