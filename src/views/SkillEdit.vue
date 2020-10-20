<template>
  <div class="row">
    <div class="col">
      <div class="card card-body">
        <SkillEditForm
        @submitHandler="editSkill($event)"
        :submitTitle="'Edit skill'"
        :selectedSkill="selectedSkill"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SkillEditForm from '../components/SkillEditForm';

export default {
  name: 'SkillEdit',
  components: {
    SkillEditForm,
  },
  methods: {
    ...mapActions(['updateSkill', 'removeImage']),
    async editSkill(skill) {
      const { id } = this.$route.params;
      try {
        if (this.selectedSkill.imageName !== skill.imageName) {
          await this.removeImage(id);
        }
        await this.updateProject({ id, skill });
        await this.$router.push({ name: 'SkillsList' });
      } catch (e) {
        console.warn(e);
      }
    },
  },
  computed: {
    ...mapGetters({
      skillsList: 'getSkills',
    }),
    selectedSkill() {
      return this.skillsList.find((item) => item.id === this.$route.params.id);
    },
  },
};
</script>

<style lang="scss">

</style>
