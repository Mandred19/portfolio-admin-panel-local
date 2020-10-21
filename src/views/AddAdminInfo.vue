<template>
  <div class="row">
    <div class="col">
      <AdminInfoEditForm
        @submitHandler="uploadInfo($event)"
        :submitTitle="'Add info'"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AdminInfoEditForm from '../components/AdminInfoEditForm';

export default {
  name: 'AddAdminInfo',
  components: {
    AdminInfoEditForm,
  },
  methods: {
    ...mapActions(['uploadData']),
    async uploadInfo(payload) {
      try {
        await this.uploadData({ dir: 'info', payload });
      } catch (e) {
        console.warn(e);
      }
    },
  },
};
</script>

<style lang="scss">

</style>
