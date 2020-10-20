<template>
  <div class="row">
    <div class="col">
      <ProjectEditForm
      @submitHandler="uploadProject($event)"
      :submitTitle="'Add project'"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ProjectEditForm from '../components/ProjectEditForm';

export default {
  name: 'AddProject',
  components: {
    ProjectEditForm,
  },
  methods: {
    ...mapActions(['uploadData']),
    async uploadProject(payload) {
      try {
        await this.uploadData({ dir: 'projects', payload });
      } catch (e) {
        console.warn(e);
      }
    },
  },
};
</script>

<style lang="scss"></style>
