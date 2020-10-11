import Vue from 'vue';
import VueRouter from 'vue-router';

import ProjectsList from '../views/ProjectsList';
import ProjectEdit from '../views/ProjectEdit';
import AddProject from '../views/AddProject';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'ProjectsList',
    component: ProjectsList,
  },
  {
    path: '/project/:id',
    name: 'ProjectEdit',
    component: ProjectEdit,
  },
  {
    path: '/add-project',
    name: 'AddProject',
    component: AddProject,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
