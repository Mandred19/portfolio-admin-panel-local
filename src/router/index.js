import Vue from 'vue';
import VueRouter from 'vue-router';

import ProjectsList from '../views/ProjectsList';
import ProjectEdit from '../views/ProjectEdit';
import AddProject from '../views/AddProject';
import SkillsList from '../views/SkillsList';
import SkillEdit from '../views/SkillEdit';
import AddSkill from '../views/AddSkill';

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
  {
    path: '/skills',
    name: 'SkillsList',
    component: SkillsList,
  },
  {
    path: '/skills/:id',
    name: 'SkillEdit',
    component: SkillEdit,
  },
  {
    path: '/add-skill',
    name: 'AddSkill',
    component: AddSkill,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
