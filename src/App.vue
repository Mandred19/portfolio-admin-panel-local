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
        { to: '/projects', title: 'Projects', active: this.$route.name === 'ProjectsList' },
        { to: '/add-project', title: 'Add project', active: this.$route.name === 'AddProject' },
        { to: '/skills', title: 'Skills', active: this.$route.name === 'SkillsList' },
        { to: '/add-skill', title: 'Add skill', active: this.$route.name === 'AddSkill' },
        { to: '/admin-info', title: 'Admin info', active: this.$route.name === 'AdminInfo' },
        { to: '/add-admin-info', title: 'Add info', active: this.$route.name === 'AddAdminInfo' },
      ];
    },
  },
};
</script>

<style lang="scss">
  .active {
    background-color: rgba(#999, .2);
  }
</style>
