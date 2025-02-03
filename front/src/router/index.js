// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import SearchPage from '@/views/SearchPage.vue';
import InfoReceta from '@/views/InfoReceta.vue';
import AgregarReceta from '@/views/AgregarReceta.vue';
import login from '@/components/login.vue';
import register from '@/components/register.vue';
import Guardadas from '@/views/Guardadas.vue';
import { useAuthStore } from '@/stores/authStore';  // Importa el store de autenticación

const routes = [
  {
    path: '/recetas',
    name: 'LandingPage',
    component: LandingPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/agregar',
    name: 'AgregarReceta',
    component: AgregarReceta,
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    name: 'login',
    component: login,
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/info/:recipeId',
    name: 'InfoReceta',
    component: InfoReceta,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/guardar',
    name: 'Guardadas',
    component: Guardadas,
    meta: { requiresAuth: true },
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('@/views/Perfil.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Verificación de autenticación antes de cada ruta
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Si la ruta requiere autenticación y no hay token, redirige a login
  if (to.meta.requiresAuth && !authStore.token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
