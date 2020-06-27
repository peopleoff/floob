import Vue from "vue";
import VuePlyr from "vue-plyr/dist/vue-plyr.ssr.js";

/*
 ** vue-plyr configuration
 ** See  https://github.com/redxtech/vue-plyr
 */

// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
  plyr: {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "volume",
      "captions",
      "settings",
      "pip",
      "airplay",
      "fullscreen"
    ],
    youtube: {
      noCookie: true
    },
    ratio: "w:h",
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
