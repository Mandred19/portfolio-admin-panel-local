<template>
  <div class="row">
    <div class="col">
      <ul class="list-group">
        <li
          v-for="item of projectsList"
          :key="item.id"
          class="list-group-item">
          <div class="card card-header">
            <strong>
              {{ item.title }}
            </strong>
          </div>

          <div class="card card-body mb-2">
            <div class="row">
              <div class="col">
                <p>{{ item.url }}</p>

                <p>{{ item.date }}</p>

                <p>{{ item.description }}</p>

                <div class="d-flex flex-row flex-wrap mb-2">
                  <span
                    v-for="tech of item.technologies"
                    :key="tech"
                    class="badge badge-secondary mr-1">
                  {{ tech }}
                </span>
                </div>

                <div class="form-group form-check">
                  <input type="checkbox" :checked="item.isVisible" disabled class="form-check-input" id="isVisible">
                  <label class="form-check-label" for="isVisible">Project is visible</label>
                </div>
              </div>

              <div class="col">
                <img :src="item.imageSrc" :alt="item.title" class="mb-2" style="width: 400px">
              </div>
            </div>

            <div class="btn-group">
              <a :href="item.url" target="_blank" type="button" class="btn btn-success">View</a>

              <router-link tag="button" :to="`/project/${item.id}`" class="btn btn-primary">Edit</router-link>

              <button @click="deleteProject(item.id)" class="btn btn-danger">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProjectsList',
  methods: {
    ...mapActions(['removeProject']),
    async deleteProject(id) {
      try {
        await this.removeProject(id);
      } catch (e) {
        console.warn(e);
      }
    },
  },
  computed: {
    ...mapGetters({
      projectsList: 'getProjects',
    }),
  },
};
</script>

<style lang="scss"></style>
