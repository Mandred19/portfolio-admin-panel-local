<template>
  <form @submit.prevent="submitHandler">
    <div class="form-group">
      <label for="project-title">Project title</label>

      <input v-model="project.title" type="text" class="form-control" id="project-title">
    </div>

    <div class="form-group">
      <label for="project-url">Project GIT URL</label>

      <input v-model="project.url" type="url" class="form-control" id="project-url">
    </div>

    <div class="form-group">
      <label for="project-completion-date">Project completion date</label>

      <input v-model="project.date" type="date" class="form-control" id="project-completion-date">
    </div>

    <input type="file" class="form-control" id="project-add-file">

    <div class="form-group d-flex flex-column">
      <label for="project-description">Project description</label>

      <textarea
        v-model="project.description"
        name="description"
        id="project-description"
        cols="30"
        rows="10"></textarea>
    </div>

    <button type="submit" class="btn btn-primary">{{ submitTitle }}</button>
  </form>
</template>

<script>
export default {
  name: 'ProjectEditForm',
  props: {
    submitTitle: { type: String, require },
    route: { type: String, default: '' },
    selectedProject: { type: Object, default: () => {} },
  },
  created() {
    if (this.route === 'ProjectEdit') {
      this.project = this.selectedProject;
    }
  },
  methods: {
    submitHandler() {
      this.$emit('submitHandler', this.project);
      this.resetForm();
    },
    resetForm() {
      this.project = {
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
      project: {
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
