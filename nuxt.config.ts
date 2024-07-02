// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"], 
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles.scss" as *;'
        }
      }
    }
  },
  components: [
    {
      path: 'app',
      extensions: ['.vue'],
      pathPrefix: false,
    },
    {
      path: 'pages',
      extensions: ['.vue'],
      pathPrefix: false,
    },
    {
      path: 'widgets',
      extensions: ['.vue'],
      pathPrefix: false,
    },
    {
      path: 'features',
      extensions: ['.vue'],
      pathPrefix: false,
    },
    {
      path: 'entities',
      extensions: ['.vue'],
      pathPrefix: false,
    },
    {
      path: 'shared',
      extensions: ['.vue'],
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: [
        'app/**/*.{ts, vue}',
        'pages/**/*.{ts, vue}',
        'widgets/**/*.{ts, vue}',
        'features/**/*.{ts, vue}',
        'entities/**/*.{ts, vue}',
        'widgets/**/*.{ts, vue}',
    ],
  },
})
