import type { MongoAbility } from '@casl/ability';

export const usePermission = () => {
  const route = useRoute();

  const { $ability } = useNuxtApp();

  const ability = $ability as MongoAbility;

  const can = (action: string) => ability.can(action, routeName.value);

  const routeName = computed(() => route.name as string);
  const hasAction = computed(() => can('update') || can('delete'));
  const hasBatchSelect = computed(() => can('update') && can('delete'));

  return {
    ability,
    hasAction,
    hasBatchSelect,

    can,
  };
};
