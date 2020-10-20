<template>
  <div class="row">
    <div class="col">
      <SkillEditForm
        @submitHandler="uploadSkill($event)"
        :submitTitle="'Add skill'"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import SkillEditForm from '../components/SkillEditForm';

export default {
  name: 'AddSkill',
  components: {
    SkillEditForm,
  },
  methods: {
    ...mapActions(['uploadData']),
    async uploadSkill(payload) {
      try {
        await this.uploadData({ dir: 'skills', payload });
      } catch (e) {
        console.warn(e);
      }
    },
  },
};
</script>

<style lang="scss">

</style>
