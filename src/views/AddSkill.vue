<template>
  <div class="row">
    <div class="col">
      <SkillEditForm
        @submitHandler="uploadNewSkill($event)"
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
    ...mapActions(['uploadSkill']),
    async uploadNewSkill(form) {
      try {
        await this.uploadSkill(form);
      } catch (e) {
        console.warn(e);
      }
    },
  },
};
</script>

<style lang="scss">

</style>
