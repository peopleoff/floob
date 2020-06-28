import Vue from "vue";
import VuePlyr from "vue-plyr/dist/vue-plyr.ssr.js";

/*
 ** vue-plyr configuration
 ** See  https://github.com/redxtech/vue-plyr
 */

// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
  plyr: {
    youtube: {
      noCookie: true
    },
    // listeners: {
    //   seek: function customSeekBehavior(e, test) {
    //     console.log("seeked");
    //   },
    //   pause: function tester(e, test) {
    //     console.log("paused");
    //     console.log(e);
    //     console.log(test);
    //   },
    //   play: function tester(e, test) {
    //     console.log("play");
    //     console.log(e);
    //     console.log(test);
    //   },
    // },
    ratio: "16:9",
    muted: true
  },
  emit: [
    "ended",
    "ready",
    "seeked",
    "play",
    "pause",
    "ratechange",
    "timeupdate"
  ]
});
