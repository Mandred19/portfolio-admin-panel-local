<template>
  <div class="row">
    <div class="col">
      <div class="card card-body">
        <img src="" alt="" class="mb-3">

        <ProjectEditForm
        @submitHandler="editProject($event)"
        :submitTitle="'Save changes'"
        :selectedProject="selectedProject"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProjectEditForm from '../components/ProjectEditForm';

export default {
  name: 'ProjectEdit',
  components: {
    ProjectEditForm,
  },
  methods: {
    ...mapActions(['updateProject']),
    async editProject(form) {
      await this.updateProject({ id: this.$route.params.id, form });
      await this.$router.push({ name: 'ProjectsList' });
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
