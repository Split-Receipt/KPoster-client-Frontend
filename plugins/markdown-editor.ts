import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import esES from '@kangc/v-md-editor/lib/lang/es-ES';

export default defineNuxtPlugin((nuxtApp) => {
	VMdEditor.lang.use('es-ES', esES);
	VMdEditor.use(vuepressTheme);
  nuxtApp.vueApp.use(VMdEditor);
});
