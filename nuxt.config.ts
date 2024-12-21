import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/logo.svg' } // Указываем путь к фавикону
      ]
    }
  },
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "nuxt-swiper", "@nuxtjs/i18n", "@nuxt/image", '@vueuse/nuxt', "@pinia/nuxt", "nuxt-gtag"],
  pinia: {
    storesDirs: ['./stores/**'],
  },
	gtag: {
    id: 'G-R3P5VNXQH2'
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    strategy: 'prefix_and_default',
    locales: ['en', 'es', 'qu'],
    defaultLocale: 'en'
  },
  image: {

  },
  css: ["/app/styles/scss/styles.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "app/styles/scss/abstracts/_variables.scss" ;
            @import "app/styles/scss/components/_all.scss" ;
            @import "app/styles/scss/pages/_all.scss" ;
          `,
        },
      },
    },
  },

  alias: {
    "@pages": "/pages",
    "@shared": "/shared",
    "@entities": "/entities",
    "@features": "/features",
    "@styles": "/app/styles",
    "@app": "/app",
    "@widgets": "/widgets",
        "@stores": "/stores"
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL
    }
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
      extensions: [".vue", ".ts"],
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

  compatibilityDate: "2024-07-10",
});
