import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';
import Detail from './views/detail.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
    },
  ],
});
