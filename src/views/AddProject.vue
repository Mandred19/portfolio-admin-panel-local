<template>
  <div class="row">
    <div class="col">
      <ProjectEditForm
      @submitHandler="uploadNewProject($event)"
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
    ...mapActions(['uploadProject']),
    async uploadNewProject(form) {
      await this.uploadProject(form);
    },
  },
};
</script>

<style lang="scss"></style>
