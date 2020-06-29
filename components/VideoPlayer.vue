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
      let playerID = this.player.id;
      if (playerID !== payload.playerID) {
        this.player.currentTime = newTime;
      }
    },
    playVideo: function(payload) {
      let playerID = this.player.id;
      let eventPlayerID = payload.playerID;
      if (playerID !== eventPlayerID) {
        this.player.play();
      }
    },
    pauseVideo: function(payload) {
      let playerID = this.player.id;
      let eventPlayerID = payload.playerID;
      if (playerID !== eventPlayerID) {
        this.player.pause();
      }
    },
    playSpeed: function(payload) {
      let playerID = this.player.id;
      let eventPlayerID = payload.playerID;
      if (playerID !== eventPlayerID) {
        this.player.speed = payload.speed;
      }
    }
  },
  methods: {
    endedEvent(event) {
      this.$emit("ended", this.video);
    },
    readyEvent(event) {
      this.player.play();
    },
    async playEvent(event) {
      let plyr = event.detail.plyr;
      let lastSeekTime = new Date(plyr.lastSeekTime);
      let nowTimestamp = new Date();

      let timeDifference = (nowTimestamp - lastSeekTime) / 10000;
      if (timeDifference < 0.0005) {
        let time = await this.getCurrentTime();
        let payload = {
          playerID: this.player.id,
          roomID: this.room.id,
          seconds: time
        };
        this.$socket.emit("syncVideo", payload);
      } else {
        this.$socket.emit("playVideo", this.room.id);
      }
    },
    getCurrentTime() {
      return this.player.currentTime;
    },
    rateChangeEvent(event) {
      let payload = {
        playerID: this.player.id,
        roomID: this.room.id,
        speed: event.detail.plyr.speed
      };
      this.$socket.emit("playSpeed", payload);
    },
    pauseEvent(event) {
      let plyr = event.detail.plyr;
      let lastSeekTime = new Date(plyr.lastSeekTime);
      let nowTimestamp = new Date();

      let timeDifference = (nowTimestamp - lastSeekTime) / 10000;
      if (timeDifference < 0.0005) {
        return;
      } else {
        this.$socket.emit("pauseVideo", this.room.id);
      }
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
