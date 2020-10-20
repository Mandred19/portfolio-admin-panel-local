<template>
  <form @submit.prevent="submitHandler">
    <div class="form-group">
      <label for="skill-title">Skill title</label>
      <input v-model="skill.title" type="text" class="form-control" id="skill-title">
    </div>

    <div class="form-group">
      <label for="skill-progress">Skill progress</label>
      <input v-model="skill.progress" type="number" class="form-control" id="skill-progress">
    </div>

    <input
    @change="addFileHandler($event)"
    type="file"
    :multiple="false"
    accept="image/png, image/jpeg"
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
      this.skill = this.selectedSkill;
    }
  },
  methods: {
    submitHandler() {
      this.$emit('submitHandler', this.skill);
      this.resetForm();
    },
    addFileHandler(event) {
      // eslint-disable-next-line prefer-destructuring
      this.skill.image = event.target.files[0];
      this.skill.imageName = `skills/${event.target.files[0].name}`;
    },
    resetForm() {
      this.skill = {
        title: null,
        progress: null,
        image: null,
        imageName: null,
      };
    },
  },
  data() {
    return {
      skill: {
        title: null,
        progress: null,
        image: null,
        imageName: null,
      },
    };
  },
};
</script>

<style lang="scss">

</style>
