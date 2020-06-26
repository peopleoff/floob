import colors from "vuetify/es5/util/colors";
require("dotenv").config();

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
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
    "@nuxtjs/auth"
  ],
  /*
   ** Sentry module configuration
   ** See  https://docs.sentry.io/error-reporting/configuration/?platform=browser
   */
  sentry: {
    dsn:
      "https://95d647b1ecad4b54b46182bc9bf8fc09@o330708.ingest.sentry.io/1851159",
    disabled:  process.env.ENV = "DEVELOPMENT" ? false : true
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
    theme: {
      dark: true,
      themes: {
        dark: {
          royal_flue: "#2f64EB",
          kings_purple: "#634FD6",
          legendary_mint: "#00CCC2",
          just_purple: "#BB67F5",
          more_than_blue: "#161663",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
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
