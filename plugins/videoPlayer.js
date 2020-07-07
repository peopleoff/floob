import Vue from "vue";
import VuePlyr from "vue-plyr/dist/vue-plyr.ssr.js";

let muteVideo = false;

if(process.env.ENV === "DEVELOPMENT"){
  muteVideo = true;
}

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
    listeners: {
      seek: function customSeekBehavior(e) {
        console.log(e);
      },
      // play: function tester(e, test) {
      //   console.log("play");
      //   console.log(e);
      //   console.log(test);
      // },
    },
    ratio: "16:9",
    muted: muteVideo
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
