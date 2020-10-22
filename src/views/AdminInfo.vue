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

        <form @submit.prevent="submitHandler('image')" class="card card-body mb-4">
          <img :src="imageSrcMain" alt="main-image" class="mb-3" style="width: 300px">

          <p class="mb-2">Upload new image</p>

          <input
          @change="addFileHandler($event, 'image')"
          type="file"
          :multiple="false"
          accept="image/png, image/jpeg"
          id="add-main-image">

          <br>

          <button type="submit" class="btn btn-primary">Save</button>
        </form>

        <div class="card card-header">
          BIO
        </div>

        <form @submit.prevent="submitHandler('bio')" class="card card-body">
          <a :href="urlBio" target="_blank" class="mb-3">View BIO</a>

          <div class="form-group mb-4">
            <label for="bio-url">BIO URL</label>
            <input v-model="urlBio" type="url" class="form-control" id="bio-url">
          </div>

          <p class="mb-2">Upload new BIO</p>

          <input
          @change="addFileHandler($event, 'bio')"
          type="file"
          :multiple="false"
          accept="application/pdf"
          id="add-bio">

          <br>

          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AdminInfo',
  methods: {
    ...mapActions(['removeData', 'updateMainInfo', 'removeMainInfoFile']),
    async deleteInfo(id) {
      try {
        await this.removeData({ dir: 'info', id });
      } catch (e) {
        console.warn(e);
      }
    },
    addFileHandler(event, type) {
      if (type === 'image') {
        // eslint-disable-next-line prefer-destructuring
        this.imageMain = event.target.files[0];
        this.imageNameMain = `main-image/${event.target.files[0].name}`;
      } else if (type === 'bio') {
        // eslint-disable-next-line prefer-destructuring
        this.fileBio = event.target.files[0];
        this.fileNameBio = `bio/${event.target.files[0].name}`;
      }
    },
    async submitHandler(type) {
      let payload = null;
      if (type === 'image') {
        payload = {
          file: this.imageMain,
          fileName: this.imageNameMain,
          fileSrc: this.imageSrcMain,
        };
      } else if (type === 'bio') {
        payload = {
          file: this.fileBio,
          fileName: this.fileNameBio,
          fileSrc: this.fileSrcBio,
          urlBio: this.urlBio,
        };
      }
      try {
        if ((this.imageNameMain || this.fileNameBio)
          && this[type].fileName !== (this.imageNameMain || this.fileNameBio)) {
          await this.removeMainInfoFile({ dir: type });
        }
        await this.updateMainInfo({ dir: type, payload });
      } catch (e) {
        console.warn(e);
      }
      this.resetForm();
    },
    resetForm(type) {
      if (type === 'image') {
        this.imageMain = null;
        this.imageNameMain = null;
        this.imageSrcMain = null;
      } else if (type === 'bio') {
        this.fileBio = null;
        this.fileNameBio = null;
        this.fileSrcBio = null;
        this.urlBio = null;
      }
    },
  },
  computed: {
    ...mapGetters({
      adminInfo: 'getAdminInfo',
      image: 'getMainImage',
      bio: 'getBio',
    }),
  },
  data() {
    return {
      imageMain: null,
      imageNameMain: null,
      imageSrcMain: null,
      fileBio: null,
      fileNameBio: null,
      fileSrcBio: null,
      urlBio: null,
    };
  },
  watch: {
    image: {
      handler(val) {
        if (val) {
          const { fileSrc } = this.image;
          this.imageSrcMain = fileSrc;
        }
      },
      immediate: true,
    },
    bio: {
      handler(val) {
        if (val) {
          const { urlBio } = this.bio;
          this.urlBio = urlBio;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss">

</style>
