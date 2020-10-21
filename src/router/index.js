import Vue from 'vue';
import VueRouter from 'vue-router';

import ProjectsList from '../views/ProjectsList';
import ProjectEdit from '../views/ProjectEdit';
import AddProject from '../views/AddProject';
import SkillsList from '../views/SkillsList';
import SkillEdit from '../views/SkillEdit';
import AddSkill from '../views/AddSkill';
import AdminInfo from '../views/AdminInfo';
import AdminInfoEdit from '../views/AdminInfoEdit';
import AddAdminInfo from '../views/AddAdminInfo';

Vue.use(VueRouter);

const routes = [
  {
    path: '/projects',
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
  {
    path: '/admin-info',
    name: 'AdminInfo',
    component: AdminInfo,
  },
  {
    path: '/add-admin-info',
    name: 'AddAdminInfo',
    component: AddAdminInfo,
  },
  {
    path: '/admin-info/:id',
    name: 'AdminInfoEdit',
    component: AdminInfoEdit,
  },
  {
    path: '*',
    redirect: ProjectsList,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
