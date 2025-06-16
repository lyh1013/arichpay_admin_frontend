export default defineNuxtRouteMiddleware(async to => {
  const { setUser, getPermission } = useAuth();

  const { userPermissions } = storeToRefs(useAuth());

  const { getLocalStorage } = useStorage();

  const { $updateAbility, $clearAbility } = useNuxtApp();

  const accessToken = getLocalStorage('accessToken');

  const publicPages = ['/auth/login'];

  const requiresAuth = !publicPages.includes(to.path);

  // if (accessToken) {
  //   setUser(accessToken);

  //   await getPermission();

  //   $updateAbility(userPermissions.value ?? []);
  // }

  // if (requiresAuth && !accessToken) {
  //   $clearAbility();

  //   return navigateTo('/auth/login');
  // }

  // if (!requiresAuth && accessToken) {
  //   return navigateTo('/');
  // }
});
