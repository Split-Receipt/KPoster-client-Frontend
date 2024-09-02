// @ts-nocheck
import { type AxiosInstance } from 'axios';
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module 'nuxt/app' {
  interface NuxtApp {
    $api: AxiosInstance;
  }
}
