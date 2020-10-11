<template>
  <div class="row">
    <div class="col">
      <ul class="list-group">
        <li
          v-for="item of projectsList"
          :key="item.id"
          data-toggle="collapse"
          :data-target="`#${item.title}`"
          aria-expanded="false"
          :aria-controls="`#${item.title}`"
          class="list-group-item">
          <strong>
            {{ item.title }}
          </strong>

          <div class="collapse" :id="item.title">
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

              <img :src="item.image" :alt="item.title" class="mb-2">

              <div class="btn-group">
                <a :href="item.url" target="_blank" type="button" class="btn btn-success">View</a>

                <router-link tag="button" :to="`/project/${item.id}`" class="btn btn-primary">Edit</router-link>

                <button class="btn btn-danger">Delete</button>
              </div>
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
