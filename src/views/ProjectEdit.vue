<template>
  <div class="row">
    <div class="col">
      <div class="card card-body">
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
    ...mapActions(['updateProject', 'removeImage']),
    async editProject(project) {
      const { id } = this.$route.params;
      try {
        if (this.selectedProject.imageName !== project.imageName) {
          await this.removeImage(id);
        }
        await this.updateProject({ id, project });
        await this.$router.push({ name: 'ProjectsList' });
      } catch (e) {
        console.warn(e);
      }
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
