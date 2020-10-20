<template>
    <div class="row">
      <div class="col">
        <ul
        v-if="skillsList && skillsList.length"
        class="list-group">
          <li
          v-for="(item, idx) of skillsList"
          :key="idx"
          class="list-group-item">
            <div class="card card-header">
              <strong>
                {{ item.title }}
              </strong>
            </div>

            <div class="card card-body mb-2">
              <div class="row">
                <div class="col">
                  <p>{{ item.progress }}</p>
                </div>

                <div class="col">
                  <img :src="item.imageSrc" :alt="item.title" class="mb-2" style="width: 75px">
                </div>
              </div>

              <div class="btn-group">
                <router-link tag="button" :to="`/skills/${item.id}`" class="btn btn-primary">Edit</router-link>

                <button @click="deleteSkill(item.id)" class="btn btn-danger">Delete</button>
              </div>
            </div>
          </li>
        </ul>

        <p v-else>Skills list is empty</p>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SkillsList',
  methods: {
    ...mapActions(['removeData']),
    async deleteSkill(id) {
      try {
        await this.removeData({ dir: 'skills', id });
      } catch (e) {
        console.warn(e);
      }
    },
  },
  computed: {
    ...mapGetters({
      skillsList: 'getSkillsList',
    }),
  },
};
</script>

<style lang="scss">

</style>
