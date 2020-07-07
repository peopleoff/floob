<template>
  <div id="video-size">
    <section class="video-background">
      <div id="video-wrapper">
        <vue-plyr
          ref="plyr"
          @ended="endedEvent"
          @ready="readyEvent"
          @play="togglePlayingEvent"
          @pause="togglePlayingEvent"
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
    // playVideo: function(payload) {
    //   console.log(this.player);
    //   console.log(payload);
    //   this.player.play();
    // },
    pauseVideo: function(payload) {
      console.log(this.player);
      console.log(payload);
      this.player.pause();
    },
    // toggleVideo: function(payload) {
    //   console.log(payload);
    //   //If current time is 0, video was just started.
    //   if (this.player.currentTime == 0) {
    //     return false;
    //   }
    //   console.log(this.player);
    //   // if(this.player.playing){
    //   //   this.player.pause();
    //   // }else{
    //   //   this.player.play();
    //   // }
    //   // let playerID = this.player.id;
    //   // let eventPlayerID = payload.playerID;
    //   // if (playerID !== eventPlayerID) {
    //   //   this.player.play();
    //   // }
    // },
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
    readyEvent(event) {
      this.player.speed = parseInt(1);
      this.player.play();
    },
    togglePlayingEvent(event) {
      let plyr = event.detail.plyr;
      //Video was auto played on start
      if (plyr.currentTime == 0) {
        return false;
      }

      let lastSeekTime = new Date(plyr.lastSeekTime);
      let nowTimestamp = new Date();
      let timeDifference = (nowTimestamp - lastSeekTime) / 10000;
      let time = plyr.currentTime;
      let payload = {
        playerID: this.player.id,
        roomID: this.room.id,
        seconds: time
      };

      //If time between lastSeek and current time is small, user has seeked
      if (timeDifference < 0.0005) {
        this.$socket.emit("syncVideo", payload);
      }
      //Else user toggled play/pause
      else {
        //If playing == true, user has played a video
        if (plyr.playing) {
          this.$socket.emit("playVideo", payload);
        } else {
          this.$socket.emit("pauseVideo", payload);
        }
      }

      // if (timeDifference < 0.0005) {
      //   let time = plyr.currentTime;
      //   let payload = {
      //     playerID: this.player.id,
      //     roomID: this.room.id,
      //     seconds: time
      //   };
      //   let secondsRounded = Math.round(time);
      //   let secondsFormatted = secondsRounded;

      //   // var formatted = duration.format("hh:mm:ss");
      //   this.sendActionToChat(
      //     "skipped to " + this.formatTime(Math.round(time))
      //   );
      //   this.$socket.emit("syncVideo", payload);
      // } else {
      //   let time = plyr.currentTime;
      //   if (time > 1) {
      //     this.sendActionToChat("played the video");
      //   }
      //   this.$socket.emit("toggleVideo", this.room.id);
      // }
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
    endedEvent(event) {
      this.$emit("ended", this.video);
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
      };
      VideoService.voteToSkip(payload)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
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
      if (this.$refs.plyr) {
        return this.$refs.plyr.player;
      }
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
