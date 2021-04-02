require("dotenv").config();

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "Floob",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Playing games? Hanging out in Discord? Need to share that bathwater chicks newest video that is 100% YouTube appropriate? Use Floob!"
      },
      {
        hid: "og:title",
        name: "og:title",
        content: "Floob"
      },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: "Floob"
      },
      {
        hid: "og:url",
        name: "og:url",
        content: "https://Floob.gg"
      },
      {
        hid: "og:image",
        name: "og:image",
        content: "https://floob.gg/images/og_image.png"
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Playing games? Hanging out in Discord? Need to share that bathwater chicks newest video that is 100% YouTube appropriate? Use Floob!"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#00CCC2", throttle: 0 },
  /*
   ** Global CSS
   */
  css: [
    "normalize.css/normalize.css",
    "plyr/dist/plyr.css",
    "~/assets/css/plyr.css",
    "~/assets/css/main.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: "~plugins/videoPlayer.js"
    },
    {
      src: "~plugins/tracking.js",
      mode: "client"
    },
    {
      src: "~plugins/vueTyped.js"
    },
    {
      src: "~plugins/vuelidate.js"
    },
    {
      src: "~plugins/logging.js"
    },
    {
      src: "~plugins/vMask.js"
    },
    {
      src: "~plugins/moment.js"
    },
    {
      src: "~plugins/socket.js",
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    // Doc: https://github.com/nuxt-community/sentry-module#readme
    "@nuxtjs/sentry",
    // Doc: https://auth.nuxtjs.org/guide/setup.html
    "@nuxtjs/auth",
    // Doc: https://github.com/nuxt-community/analytics-module
    "@nuxtjs/google-analytics"
  ],
  /*
   ** pwa module configuration
   ** See https://pwa.nuxtjs.org/
   */
  pwa: {
    manifest: {
      name: "Floob",
      short_name: "Floob",
      description:
        "Playing games? Hanging out in Discord? Need to share that bathwater chicks newest video that is 100% YouTube appropriate? Use Floob!",
      background_color: "#6d4496"
    }
  },
  /*
   ** Sentry module configuration
   ** See  https://docs.sentry.io/error-reporting/configuration/?platform=browser
   */
  sentry: {
    dsn:
      "https://95d647b1ecad4b54b46182bc9bf8fc09@o330708.ingest.sentry.io/1851159"
  },
  /*
   ** Google Analytics module configuration
   ** See https://github.com/nuxt-community/analytics-module
   */
  googleAnalytics: {
    id: "UA-151104834-1"
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL
  },
  auth: {
    redirect: {
      login: false,
      logout: "/",
      callback: false,
      home: false
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/users/login",
            method: "post",
            propertyName: "token"
          },
          logout: false,
          user: { url: "/users/getUser", method: "post", propertyName: "user" }
        }
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      }
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    optionsPath: "./vuetify.options.js"
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
