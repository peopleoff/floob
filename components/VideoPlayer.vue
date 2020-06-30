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
      <!-- <v-btn outlined color="legendary_mint" @click="voteToSkip">Vote To Skip(0)</v-btn> -->
    </div>
  </div>
</template>


<script>
import _ from "lodash";
import { mapState, mapActions } from "vuex";
import VideoService from "@/services/VideoService";

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
    ...mapActions({
      notificationAdd: "notification/add"
    }),
    endedEvent(event) {
      this.$emit("ended", this.video);
    },
    readyEvent(event) {
      this.player.speed = parseInt(1);
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
        let secondsRounded = Math.round(time);
        let secondsFormatted = secondsRounded;

        // var formatted = duration.format("hh:mm:ss");
        this.sendActionToChat(
          "skipped to " + this.formatTime(Math.round(time))
        );
        this.$socket.emit("syncVideo", payload);
      } else {
        let time = await this.getCurrentTime();
        if (time > 1) {
          this.sendActionToChat("played the video");
        }
        this.$socket.emit("playVideo", this.room.id);
      }
    },
    formatTime(time) {
      // Hours, minutes and seconds
      var hrs = ~~(time / 3600);
      var mins = ~~((time % 3600) / 60);
      var secs = ~~time % 60;

      // Output like "1:01" or "4:03:59" or "123:03:59"
      var ret = "";
      if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
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
      this.sendActionToChat("Changed speed to " + event.detail.plyr.speed);
      this.$socket.emit("playSpeed", payload);
    },
    voteToSkip() {
      if (!this.$auth.loggedIn) {
        this.notificationAdd({
          type: "info",
          message: "Please Login To Vote"
        });
        return;
      }
      let payload = {
        videoID: this.video.id,
        userID: this.$auth.user.id,
        roomID: this.room.id
      }
      VideoService.voteToSkip(payload)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
    },
    pauseEvent(event) {
      let plyr = event.detail.plyr;
      let lastSeekTime = new Date(plyr.lastSeekTime);
      let nowTimestamp = new Date();

      let timeDifference = (nowTimestamp - lastSeekTime) / 10000;
      if (timeDifference < 0.0005) {
        return;
      } else {
        this.sendActionToChat("paused the video");
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
    },
    sendActionToChat(message) {
      let newMessage = {
        eventMessage: true,
        message: message,
        roomID: this.room.id,
        user: this.$auth.user
      };
      this.$socket.emit("sendMessage", newMessage);
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
