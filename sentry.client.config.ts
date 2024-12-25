import * as Sentry from '@sentry/nuxt';

Sentry.init({
  // If set up, you can use your runtime config here
  // dsn: useRuntimeConfig().public.sentry.dsn,
  dsn: 'https://4be2687f097f63466f0ec79619c268f0@o4508507141046272.ingest.us.sentry.io/4508507145961472',

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
