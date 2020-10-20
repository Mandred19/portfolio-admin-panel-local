<template>
  <form @submit.prevent="submitHandler">
    <div class="form-group">
      <label for="project-title">Project title</label>
      <input v-model="project.title" type="text" class="form-control" id="project-title">
    </div>

    <strong>{{ this.project.imageName }}</strong>

    <div class="form-group">
      <label for="project-url">Project GIT URL</label>
      <input v-model="project.url" type="url" class="form-control" id="project-url">
    </div>

    <div class="form-group mb-4">
      <label for="project-completion-date">Project completion date</label>
      <input v-model="project.date" type="date" class="form-control" id="project-completion-date">
    </div>

    <label class="form-check-label mb-2" for="tech-input">Project technologies</label>
    <div class="input-group">
      <input
      v-model="technology"
      type="text"
      class="form-control"
      placeholder="Technology"
      id="tech-input">
      <div class="input-group-append">
        <button
          @click.stop="addTechnology(technology)"
          type="button"
          class="btn btn-outline-secondary">Add technology</button>
      </div>
    </div>

    <div class="d-flex flex-row flex-wrap mb-3">
      <template v-if="project.technologies.length">
        <h4
          v-for="(tech, idx) of project.technologies"
          :key="idx"
          @click.stop="deleteTechnology(tech)"
          :title="`Click to remove ${tech}`"
          class="mr-1">
        <span class="badge badge-secondary">
          {{ tech }}
        </span>
        </h4>
      </template>

      <p v-else>Technology list is empty</p>
    </div>

    <div class="form-group form-check">
      <input type="checkbox" v-model="project.isVisible" class="form-check-input" id="isVisible">
      <label class="form-check-label" for="isVisible">Project visibility</label>
    </div>

    <input
    @change="addFileHandler($event)"
    type="file"
    :multiple="false"
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
        rows="5"></textarea>
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
    addTechnology(tech) {
      if (tech) {
        this.project.technologies.push(tech);
        this.technology = '';
      }
    },
    deleteTechnology(tech) {
      this.project.technologies = this.project.technologies.filter((item) => item !== tech);
    },
    submitHandler() {
      this.$emit('submitHandler', this.project);
      this.resetForm();
    },
    addFileHandler(event) {
      // eslint-disable-next-line prefer-destructuring
      this.project.image = event.target.files[0];
      this.project.imageName = `projects/${event.target.files[0].name}`;
    },
    resetForm() {
      this.project = {
        title: null,
        url: null,
        date: null,
        description: null,
        image: null,
        imageName: null,
        technologies: ['HTML', 'CSS', 'JavaScript'],
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
        imageName: null,
        technologies: ['HTML', 'CSS', 'JavaScript'],
        isVisible: true,
      },
      technology: '',
    };
  },
};
</script>

<style lang="scss"></style>
