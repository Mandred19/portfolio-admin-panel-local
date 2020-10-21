<template>
  <form @submit.prevent="submitHandler">
    <div class="form-group">
      <label for="social-title">Social title</label>
      <input v-model="title" type="text" class="form-control" id="social-title">
    </div>

    <div class="form-group">
      <label for="social-url">Social URL</label>
      <input v-model="url" type="url" class="form-control" id="social-url">
    </div>

    <input
      @change="addFileHandler($event)"
      type="file"
      :multiple="false"
      accept="image/png, image/jpeg, image/svg+xml"
      id="social-add-file"
      style="margin-bottom: 16px;">

    <br>

    <button type="submit" class="btn btn-primary">{{ submitTitle }}</button>
  </form>
</template>

<script>
export default {
  name: 'AdminInfoEditForm',
  props: {
    submitTitle: { type: String },
    selectedInfo: { type: Object, default: () => {} },
  },
  created() {
    if (this.$route.name === 'AdminInfoEdit') {
      const {
        title, url, image, imageName, imageSrc,
      } = this.selectedInfo;
      this.title = title;
      this.url = url;
      this.image = image;
      this.imageName = imageName;
      this.imageSrc = imageSrc;
    }
  },
  methods: {
    submitHandler() {
      this.$emit('submitHandler', {
        title: this.title,
        url: this.url,
        image: this.image,
        imageName: this.imageName,
        imageSrc: this.imageSrc,
      });
      this.resetForm();
    },
    addFileHandler(event) {
      // eslint-disable-next-line prefer-destructuring
      this.image = event.target.files[0];
      this.imageName = `info/${event.target.files[0].name}`;
    },
    resetForm() {
      this.title = null;
      this.url = null;
      this.image = null;
      this.imageName = null;
      this.imageSrc = null;
    },
  },
  data() {
    return {
      title: null,
      url: null,
      image: null,
      imageName: null,
      imageSrc: null,
    };
  },
};
</script>

<style lang="scss">

</style>
