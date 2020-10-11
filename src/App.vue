<template>
  <div class="container">
    <div class="nav justify-content-center">
      <div
        v-for="(item, idx) of navLinks"
        :key="idx"
        class="nav-item">
        <router-link
          :to="item.to"
          exact
          :class="{ active: item.active }"
          class="nav-link">
          {{ item.title }}
        </router-link>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  created() {
    this.initApp();
  },
  methods: {
    ...mapActions(['initApp']),
  },
  computed: {
    navLinks() {
      return [
        { to: '/', title: 'Home', active: this.$route.name === 'ProjectsList' },
        { to: '/add-project', title: 'Add project', active: this.$route.name === 'AddProject' },
      ];
    },
  },
};
</script>

<style lang="scss"></style>
