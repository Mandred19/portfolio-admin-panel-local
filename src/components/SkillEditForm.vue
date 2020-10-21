<template>
  <form @submit.prevent="submitHandler">
    <div class="form-group">
      <label for="skill-title">Skill title</label>
      <input v-model="title" type="text" class="form-control" id="skill-title">
    </div>

    <div class="form-group">
      <label for="skill-progress">Skill progress</label>
      <input v-model="progress" type="number" class="form-control" id="skill-progress">
    </div>

    <input
    @change="addFileHandler($event)"
    type="file"
    :multiple="false"
    accept="image/png, image/jpeg, image/svg+xml"
    id="project-add-file"
    style="margin-bottom: 16px;">

    <br>

    <button type="submit" class="btn btn-primary">{{ submitTitle }}</button>
  </form>
</template>

<script>
export default {
  name: 'SkillEditForm',
  props: {
    submitTitle: { type: String, require },
    selectedSkill: { type: Object, default: () => {} },
  },
  created() {
    if (this.$route.name === 'SkillEdit') {
      const {
        title, progress, image, imageName, imageSrc,
      } = this.selectedSkill;
      this.title = title;
      this.progress = progress;
      this.image = image;
      this.imageName = imageName;
      this.imageSrc = imageSrc;
    }
  },
  methods: {
    submitHandler() {
      this.$emit('submitHandler', {
        title: this.title,
        progress: this.progress,
        image: this.image,
        imageName: this.imageName,
        imageSrc: this.imageSrc,
      });
      this.resetForm();
    },
    addFileHandler(event) {
      // eslint-disable-next-line prefer-destructuring
      this.image = event.target.files[0];
      this.imageName = `skills/${event.target.files[0].name}`;
    },
    resetForm() {
      this.title = null;
      this.progress = null;
      this.image = null;
      this.imageName = null;
      this.imageSrc = null;
    },
  },
  data() {
    return {
      title: null,
      progress: null,
      image: null,
      imageName: null,
      imageSrc: null,
    };
  },
};
</script>

<style lang="scss">

</style>
