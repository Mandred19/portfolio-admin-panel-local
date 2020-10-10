import Vue from 'vue';
import VueRouter from 'vue-router';

import ProjectsList from '../views/ProjectsList';
import ProjectEdit from '../views/ProjectEdit';
import CreateProject from '../views/CreateProject';

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
    path: '/create-project',
    name: 'CreateProject',
    component: CreateProject,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
