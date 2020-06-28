<template>
  <div id="video-size">
    <section class="video-background">
      <div id="video-wrapper">
        <vue-plyr
          ref="plyr"
          @ended="endedEvent"
          @ready="readyEvent"
          @play="playEvent"
          @pause="pauseEvent"
          @ratechange="rateChangeEvent"
          @seeked="seekedEvent"
        >
          <div :data-plyr-provider="formatProvider(video.provider)" :data-plyr-embed-id="video.src"></div>
        </vue-plyr>
      </div>
    </section>
    <div class="d-flex justify-space-between align-center py-3">
      <div class="roomName">
        <div class="title" v-html="video.title"></div>
        <div class="subtitle-1">
          <v-icon>mdi-{{formatProvider(video.provider)}}</v-icon>
          <a :href="video.channelLink" target="_blank">{{video.channel}}</a>
        </div>
      </div>
      <v-btn outlined color="legendary_mint">Vote To Skip(0)</v-btn>
    </div>
  </div>
</template>


<script>
import _ from "lodash";
import { mapState } from "vuex";
export default {
  name: "VideoPlayer",
  props: ["video"],
  sockets: {
    syncVideo: function(payload) {
      //Round floats into ints for better compare
      let currentTime = Math.round(this.player.currentTime);
      let newTime = Math.round(payload.seconds);
      //Only seek if time is different
      if (newTime !== currentTime) {
        this.player.currentTime = newTime;
      }
    },
    playVideo: function(payload) {
      let playerID = this.player.id;
      let eventPlayerID = payload.playerID;
      if (playerID !== eventPlayerID) {
        this.player.play("test");
      }
    },
    pauseVideo: function(payload) {
      let playerID = this.player.id;
      let eventPlayerID = payload.playerID;
      if (playerID !== eventPlayerID) {
        this.player.pause();
      }
    }
  },
  methods: {
    seekedEvent(event) {
      let time = this.player.currentTime;
      let payload = {
        playerID: this.player.id,
        roomID: this.room.id,
        seconds: time
      };
      this.$socket.emit("seekVideo", payload);
    },
    endedEvent(event) {
      this.$emit("ended", this.video);
    },
    readyEvent(event) {
      console.log("ready");
      this.player.play();
    },
    playEvent(event) {
      this.$socket.emit("playVideo", this.room.id);
    },
    rateChangeEvent(event) {
      console.log(event.detail.plyr.speed);
    },
    pauseEvent(event) {
      // console.log(event);
      this.$socket.emit("pauseVideo", this.room.id);
    },
    playNextVideo(newVideo) {
      let provider = this.formatProvider(newVideo.provider);
      this.player.source = {
        type: "video",
        sources: [
          {
            src: newVideo.src,
            provider: provider
          }
        ]
      };
    }
  },
  computed: {
    ...mapState({
      room: state => state.room.room
    }),
    player() {
      return this.$refs.plyr.player;
    }
  },
  destroyed() {
    this.player.destroy();
  }
};
</script>

<style>
.plyr {
  height: 100%;
  width: 100%;
}

#video-wrapper {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}

.video-background {
  background-color: black;
}

.ytp-pause-overlay {
  display: none;
}
</style>
