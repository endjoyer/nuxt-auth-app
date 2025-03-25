import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  authStore.initAuth();

  if (to.path === '/account' && !authStore.isLoggedIn) {
    return navigateTo('/login');
  }

  if (to.path === '/login' && authStore.isLoggedIn) {
    return navigateTo('/account');
  }
});
