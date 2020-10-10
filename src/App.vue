<template>
  <div>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/create-project">Create</router-link>
    </div>

    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'App',
  created() {
    this.createStorage();
  },
  methods: {
    ...mapActions(['createStorage']),
  },
};
</script>

<style lang="scss"></style>
