import { createRouter, createWebHistory } from 'vue-router';
import Main from './components/Main.vue';
import Contracts from './components/Contracts.vue';
import Counterparties from './components/CP.vue';
import Search from './components/Search.vue';
import Settings from './components/Settings.vue';
import Support from './components/Support.vue';

const routes = [
  { path: '/main', component: Main },
  { path: '/contracts', component: Contracts },
  { path: '/counterparties', component: Counterparties },
  { path: '/search', component: Search },
  { path: '/settings', component: Settings },
  { path: '/support', component: Support }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
