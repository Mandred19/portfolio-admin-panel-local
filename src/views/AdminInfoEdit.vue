<template>
  <div class="row">
    <div class="col">
      <div class="card card-body">
        <AdminInfoEditForm
          @submitHandler="editInfo($event)"
          :submitTitle="'Edit info'"
          :selectedInfo="selectedInfo"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AdminInfoEditForm from '../components/AdminInfoEditForm';

export default {
  name: 'AdminInfoEdit',
  components: {
    AdminInfoEditForm,
  },
  methods: {
    ...mapActions(['updateData', 'removeImage']),
    async editInfo(payload) {
      const { id } = this.$route.params;
      try {
        if (payload.imageName && this.selectedInfo.imageName !== payload.imageName) {
          await this.removeImage({ dir: 'info', id });
        }
        await this.updateData({ id, dir: 'info', payload });
        await this.$router.push({ name: 'AdminInfo' });
      } catch (e) {
        console.warn(e);
      }
    },
  },
  computed: {
    ...mapGetters({
      adminInfo: 'getAdminInfo',
    }),
    selectedInfo() {
      return this.adminInfo.find((item) => item.id === this.$route.params.id);
    },
  },
};
</script>

<style lang="scss">

</style>
