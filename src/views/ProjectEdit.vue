<template>
  <div class="row">
    <div class="col">
      <div class="card card-body">
        <img src="" alt="" class="mb-3">

        <ProjectEditForm
        @submitHandler="updateProject($event)"
        :submitTitle="'Save changes'"
        :selectedProject="selectedProject"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProjectEditForm from '../components/ProjectEditForm';

export default {
  name: 'ProjectEdit',
  components: {
    ProjectEditForm,
  },
  methods: {
    async updateProject(form) {
      console.log(form);
    },
  },
  computed: {
    ...mapGetters({
      projectsList: 'getProjects',
    }),
    selectedProject() {
      return this.projectsList.find((item) => item.id === this.$route.params.id);
    },
  },
};
</script>

<style lang="scss"></style>
