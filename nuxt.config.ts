// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  css: ["/app/styles/scss/styles.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import 'app/styles/scss/abstracts/_variables.scss' ;
            @import 'app/styles/scss/components/_all.scss' ;
            @import 'app/styles/scss/pages/_all.scss' ;
          `,
        },
      },
    },
  },
  components: [
    {
      path: "app",
      extensions: [".vue"],
      pathPrefix: false,
    },
    {
      path: "pages",
      extensions: [".vue"],
      pathPrefix: false,
    },
    {
      path: "widgets",
      extensions: [".vue"],
      pathPrefix: false,
    },
    {
      path: "features",
      extensions: [".vue"],
      pathPrefix: false,
    },
    {
      path: "entities",
      extensions: [".vue"],
      pathPrefix: false,
    },
    {
      path: "shared",
      extensions: [".vue"],
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: [
      "app/**/*.{ts, vue}",
      "pages/**/*.{ts, vue}",
      "widgets/**/*.{ts, vue}",
      "features/**/*.{ts, vue}",
      "entities/**/*.{ts, vue}",
      "shared/**/*.{ts, vue}",
    ],
  },
});
