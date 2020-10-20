<template>
  <div class="row">
    <div class="col">
      {{ selectedProject.imageName }} {{ $store.state.projectsList }}
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
    ...mapActions(['updateData', 'removeImage']),
    async editProject(payload) {
      const { id } = this.$route.params;
      try {
        if (payload.imageName && this.selectedProject.imageName !== payload.imageName) {
          await this.removeImage({ dir: 'projects', id });
        }
        await this.updateData({ id, dir: 'projects', payload });
        await this.$router.push({ name: 'ProjectsList' });
      } catch (e) {
        console.warn(e);
      }
    },
  },
  computed: {
    ...mapGetters({
      projectsList: 'getProjectsList',
    }),
    selectedProject() {
      return this.projectsList.find((item) => item.id === this.$route.params.id);
    },
  },
};
</script>

<style lang="scss"></style>
