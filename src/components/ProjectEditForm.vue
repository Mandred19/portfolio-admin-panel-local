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

    <div class="form-group form-check">
      <input type="checkbox" v-model="project.isVisible" class="form-check-input" id="isVisible">
      <label class="form-check-label" for="isVisible">Set project visibility</label>
    </div>

    <input
    @change="addFileHandler($event)"
    type="file"
    multiple="false"
    accept="image/png, image/jpeg"
    id="project-add-file"
    style="margin-bottom: 16px;">

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
    selectedProject: { type: Object, default: () => {} },
  },
  created() {
    if (this.$route.name === 'ProjectEdit') {
      this.project = this.selectedProject;
    }
  },
  methods: {
    submitHandler() {
      this.$emit('submitHandler', this.project);
      this.resetForm();
    },
    addFileHandler(event) {
      // eslint-disable-next-line prefer-destructuring
      this.project.image = event.target.files[0];
    },
    resetForm() {
      this.project = {
        title: null,
        url: null,
        date: null,
        description: null,
        image: null,
        technologies: null,
        isVisible: true,
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
        isVisible: true,
      },
    };
  },
};
</script>

<style lang="scss"></style>
