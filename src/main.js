import Vue from 'vue';

import bootstrap from 'bootstrap';
import firebase from 'firebase/app';

import App from './App';
import './registerServiceWorker';
import router from './router';
import store from './store';

import 'bootstrap/scss/bootstrap.scss';

import 'firebase/database';

Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyCmLFq_DJicNqkkQCJ5tlX6-3kZBLFu_ZA',
  authDomain: 'my-portfolio-9e8f8.firebaseapp.com',
  databaseURL: 'https://my-portfolio-9e8f8.firebaseio.com',
  projectId: 'my-portfolio-9e8f8',
  storageBucket: 'my-portfolio-9e8f8.appspot.com',
  messagingSenderId: '968556844771',
  appId: '1:968556844771:web:eab8dc0239e2e14ac957d6',
  measurementId: 'G-DSGCDG3F46',
});

new Vue({
  router,
  store,
  bootstrap,
  render: (h) => h(App),
}).$mount('#app');
