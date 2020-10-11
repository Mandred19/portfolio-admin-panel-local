<template>
  <div class="row">
    <div class="col">
      <form @submit.prevent="uploadNewProject">
        <div class="form-group">
          <label for="project-title">Project title</label>

          <input v-model="newProject.title" type="text" class="form-control" id="project-title">
        </div>

        <div class="form-group">
          <label for="project-url">Project GIT URL</label>

          <input v-model="newProject.url" type="url" class="form-control" id="project-url">
        </div>

        <div class="form-group">
          <label for="project-completion-date">Project completion date</label>

          <input v-model="newProject.date" type="date" class="form-control" id="project-completion-date">
        </div>

        <input type="file" class="form-control" id="project-add-file">

        <div class="form-group d-flex flex-column">
          <label for="project-description">Project description</label>

          <textarea
            v-model="newProject.description"
            name="description"
            id="project-description"
            cols="30"
            rows="10"></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Add project</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddProject',
  methods: {
    ...mapActions(['uploadProject']),
    async uploadNewProject() {
      await this.uploadProject(this.newProject);
      await this.resetForm();
    },
    resetForm() {
      this.newProject = {
        title: null,
        url: null,
        date: null,
        description: null,
        image: null,
        technologies: null,
      };
    },
  },
  data() {
    return {
      newProject: {
        title: null,
        url: null,
        date: null,
        description: null,
        image: null,
        technologies: null,
      },
    };
  },
};
</script>

<style lang="scss"></style>
