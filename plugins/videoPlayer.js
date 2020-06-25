import Vue from "vue";
import VuePlyr from "vue-plyr/dist/vue-plyr.ssr.js";

/*
 ** vue-plyr configuration
 ** See  https://github.com/redxtech/vue-plyr
 */

// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false },
    ratio: "16:9",
    youtube: {
      noCookie: true
    }
  },
  emit: ["ended", "ready"]
});
