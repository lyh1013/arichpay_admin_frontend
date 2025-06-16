import * as components from 'quasar';
import { Quasar, Notify } from 'quasar';
import { type QuasarPluginOptions } from 'quasar';

import quasarLang from 'quasar/lang/zh-TW';
import quasarMaterialIconSet from 'quasar/icon-set/material-icons';

import 'quasar/dist/quasar.css';
import 'quasar/src/css/flex-addon.sass';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';

export default defineNuxtPlugin(({ vueApp, provide }) => {
  vueApp.use(Quasar, {
    components,
    plugins: { Notify },
    lang: quasarLang,
    iconSet: quasarMaterialIconSet,
    config: {
      brand: {
        primary: '#312b85',
        secondary: '#3655A7',
        third: '#F6F3FC',
        'form-title': '#3655A7',
        'on-background': '#E1DEF5',
      },
    },
    cssAddon: true,
    devTreeshaking: true,
  } as QuasarPluginOptions);

  provide('q', components.useQuasar());
});
