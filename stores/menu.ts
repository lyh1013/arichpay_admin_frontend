import MenuService from '@/services/api/menu';

export const useMenu = defineStore('menu', () => {
  const menu = ref();

  return {
    menu,
  };
});
