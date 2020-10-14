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
            <p>{{ item.url }}</p>

            <p>{{ item.date }}</p>

            <p>{{ item.description }}</p>

            <span
              v-for="tech of item.technologies"
              :key="tech"
              class="badge badge-secondary">
                {{ tech }}
              </span>

            <div class="form-group form-check">
              <input type="checkbox" :value="item.isVisible" disabled class="form-check-input" id="isVisible">
              <label class="form-check-label" for="isVisible">Project is visible</label>
            </div>

            <img :src="item.image" :alt="item.title" class="mb-2">

            <div class="btn-group">
              <a :href="item.url" target="_blank" type="button" class="btn btn-success">View</a>

              <router-link tag="button" :to="`/project/${item.id}`" class="btn btn-primary">Edit</router-link>

              <button class="btn btn-danger">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProjectsList',
  computed: {
    ...mapGetters({
      projectsList: 'getProjects',
    }),
  },
};
</script>

<style lang="scss"></style>
