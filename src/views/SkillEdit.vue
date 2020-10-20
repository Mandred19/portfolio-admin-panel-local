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
    ...mapActions(['updateData', 'removeImage']),
    async editSkill(payload) {
      const { id } = this.$route.params;
      try {
        if (payload.imageName && this.selectedSkill.imageName !== payload.imageName) {
          await this.removeImage({ dir: 'skills', id });
        }
        await this.updateData({ id, dir: 'skills', payload });
        await this.$router.push({ name: 'SkillsList' });
      } catch (e) {
        console.warn(e);
      }
    },
  },
  computed: {
    ...mapGetters({
      skillsList: 'getSkillsList',
    }),
    selectedSkill() {
      return this.skillsList.find((item) => item.id === this.$route.params.id);
    },
  },
};
</script>

<style lang="scss">

</style>
