<template>
    <div class="row">
      <div class="col">
        <ul
        v-if="adminInfo && adminInfo.length"
        class="list-group">
          <li
          v-for="(item, idx) of adminInfo"
          :key="idx"
          class="list-group-item">
            <div class="card card-body">
              <div class="row">
                <div class="col">
                  <a :href="item.url" target="_blank">{{ item.title }}</a>
                </div>

                <div class="col">
                  <img :src="item.imageSrc" :alt="item.title" class="mb-2" style="width: 50px">
                </div>
              </div>

              <div class="btn-group">
                <router-link tag="button" :to="`/admin-info/${item.id}`" class="btn btn-primary">Edit</router-link>

                <button @click="deleteInfo(item.id)" class="btn btn-danger">Delete</button>
              </div>
            </div>
          </li>
        </ul>

        <p v-else>Social links list is empty</p>
      </div>

      <div class="col">
        <div class="card card-header">
          Main image
        </div>

        <div class="card card-body mb-4">
          <img class="mb-3" style="width: 300px">

          <p class="mb-2">Upload new image</p>

          <input
          type="file"
          :multiple="false"
          accept="image/png, image/jpeg"
          id="add-main-image">
        </div>

        <div class="card card-header">
          BIO
        </div>

        <div class="card card-body">
          <a href="" target="_blank" class="mb-3">View BIO</a>

          <p class="mb-2">Upload new BIO</p>

          <input
          type="file"
          :multiple="false"
          accept="application/pdf"
          id="add-bio">
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AdminInfo',
  methods: {
    ...mapActions(['removeData']),
    async deleteInfo(id) {
      try {
        await this.removeData({ dir: 'info', id });
      } catch (e) {
        console.warn(e);
      }
    },
  },
  computed: {
    ...mapGetters({
      adminInfo: 'getAdminInfo',
    }),
  },
};
</script>

<style lang="scss">

</style>
