import { createRouter, createWebHistory } from 'vue-router';
import Main from './components/Main.vue';
import Contracts from './components/Contracts.vue';
import Counterparties from './components/CP.vue';
import Search from './components/Search.vue';
import Settings from './components/Settings.vue';
import Support from './components/Support.vue';
import Login from './components/Login.vue';
import Cookies from 'js-cookie';

const routes = [
  { path: '/', redirect: '/main' },
  { path: '/main', component: Main },
  { path: '/contracts', component: Contracts},
  { path: '/counterparties', component: Counterparties },
  { path: '/search', component: Search },
  { path: '/settings', component: Settings },
  { path: '/support', component: Support },
  { path: '/login', name: 'Login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isAuthorized = token !== null && token !== undefined;

  if (to.path !== '/login' && !isAuthorized) {
    next('/login');
  } else {
    next();
  }
});

export default router;
