import { createMongoAbility, AbilityBuilder } from '@casl/ability';

let abilityInstance = createMongoAbility([]);

const updateAbility = (permissions: Array<{ action: string; subject: any }>) => {
  const { can, rules } = new AbilityBuilder(createMongoAbility);

  permissions.forEach(item => can(item.action, item.subject));

  abilityInstance.update(rules);

  return abilityInstance;
};

const clearAbility = () => {
  abilityInstance.update([]);
};

export default defineNuxtPlugin(({ provide }) => {
  provide('ability', abilityInstance);
  provide('updateAbility', updateAbility);
  provide('clearAbility', clearAbility);
});
