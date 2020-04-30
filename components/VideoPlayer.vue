<template>
  <section id="playerContainer">
    <div
      id="player"
      v-video-player:myVideoPlayer="playerOptions"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @ready="playerReadied"
      @statechanged="playerStateChanged($event)"
    ></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // component options
      playsinline: true,

      // videojs options
      playerOptions: {
        autoplay: true,
        language: "en",
        techOrder: ["youtube"],
        sources: [
          {
            type: "video/youtube",
            src: "https://www.youtube.com/watch?v=96VId8Tj92M"
          }
        ]
        // poster: "/static/images/author.jpg",
      }
    };
  },
  mounted() {
    console.log("this is current player instance object", this.myVideoPlayer);
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log("player current update state", playerCurrentState);
    },
    // player is ready
    playerReadied(player) {
      console.log("example 01: the player is readied", player);
    }
  }
};
</script>

<style>
#playerContainer {
  height: 60vh;
  width: 100%;
}
#player {
  height: 100%;
  width: 100%;
}

#vjs_video_3 {
  height: 100%;
  width: 100%;
}
@media only screen and (max-width: 959px) {
  #playerContainer {
    height: 193px;
  }
}
</style>
