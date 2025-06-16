import { QuasarInstance } from 'quasar';
import type { MongoAbility } from '@casl/ability';

declare module '#app' {
  interface NuxtApp {
    $q: QuasarInstance;
    $updateAbility: (permissions: Array<{ action: string; subject: any }>) => MongoAbility;
    $clearAbility: () => void;
  }
}
