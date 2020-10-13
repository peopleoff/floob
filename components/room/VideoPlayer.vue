<template>
  <div id="video-size">
    <section class="video-background rounded-lg">
      <div id="video-wrapper">
        <vue-plyr
          ref="plyr"
          @ended="endedEvent"
          @ready="readyEvent"
          @play="togglePlayingEvent"
          @pause="togglePlayingEvent"
        >
          <div class="plyr__video-embed">
            <iframe :src="formatSource(video.src, video.provider)"></iframe>
          </div>
        </vue-plyr>
      </div>
    </section>
    <div class="d-flex justify-space-between align-center py-3">
      <div class="roomName">
        <div class="title">
          <a
            :href="formatVideoLink(video.src, video.provider)"
            target="_blank"
            v-html="video.title"
            class="muted-link"
          ></a>
        </div>
        <div class="subtitle-1">
          <v-icon>mdi-{{ formatProvider(video.provider) }}</v-icon>
          <a :href="video.channelLink" target="_blank" class="muted-link">{{
            video.channel
          }}</a>
        </div>
      </div>
      <div>
        <!-- <v-btn text small>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
        <v-btn text small>
          <v-icon>mdi-sync</v-icon>
        </v-btn>-->
        <v-btn outlined color="royal_flue" class="rounded-lg" @click="skipVideo"
          >Hard Pass</v-btn
        >
      </div>
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
    syncVideo: function (payload) {
      //Round floats into ints for better compare
      let currentTime = Math.round(this.player.currentTime);
      let newTime = Math.round(payload.seconds);
      //Only seek if time is different
      let player_id = this.player.id;
      if (player_id !== payload.player_id) {
        this.player.currentTime = newTime;
      }
    },
    playVideo: function (payload) {
      this.player.play();
    },
    pauseVideo: function (payload) {
      this.player.pause();
    },
    getCurrentVideoPercent: function () {
      this.timeupdateEvent();
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
    //   // let player_id = this.player.id;
    //   // let eventPlayerID = payload.player_id;
    //   // if (player_id !== eventPlayerID) {
    //   //   this.player.play();
    //   // }
    // },
    // playSpeed: function(payload) {
    //   let player_id = this.player.id;
    //   let eventPlayerID = payload.player_id;
    //   if (player_id !== eventPlayerID) {
    //     this.player.speed = payload.speed;
    //   }
    // }
  },
  methods: {
    ...mapActions({
      notificationAdd: "notification/add",
    }),
    readyEvent(event) {
      this.player.play();
    },
    syncPlayer(timestamp) {
      let currentTime = this.player.currentTime;
      console.log(Math.round(currentTime));
      console.log(Math.round((timestamp + 5)));
      //currentTime = videoPlayer time, 5 seconds into video
      //timestamp is server time, 20 seconds into video
      //Add 5 seconds to check for 5 seconds additional out of sync
      //If currentime is below the timestamp, sync up
      // if(4 < 6){console.log("why")}
      if(Math.round(currentTime  + 5) <= Math.round((timestamp))){
        console.log("Video out of sync")
        this.player.currentTime = timestamp;
      }
    },
    timeupdateEvent() {
      let currentTime = this.player.currentTime;
      let duration = this.player.duration;

      let payload = {
        player_id: this.player.id,
        room_id: this.room.id,
        currentTime: currentTime,
        duration: duration,
      };

      this.$socket.emit("updateVideo", payload);
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
        player_id: this.player.id,
        room_id: this.room.id,
        seconds: time,
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

      if (timeDifference < 0.0005) {
        let time = plyr.currentTime;
        let payload = {
          player_id: this.player.id,
          room_id: this.room.id,
          seconds: time,
        };
        let secondsRounded = Math.round(time);
        let secondsFormatted = secondsRounded;

        // var formatted = duration.format("hh:mm:ss");
        this.sendActionToChat(
          "skipped to " + this.formatTime(Math.round(time))
        );
        this.$socket.emit("syncVideo", payload);
      } else {
        let time = plyr.currentTime;
        if (time > 1) {
          this.sendActionToChat("played the video");
        }
        this.$socket.emit("toggleVideo", this.room.id);
      }
    },
    rateChangeEvent(event) {
      let payload = {
        player_id: this.player.id,
        room_id: this.room.id,
        speed: event.detail.plyr.speed,
      };
      this.sendActionToChat("Changed speed to " + event.detail.plyr.speed);
      this.$socket.emit("playSpeed", payload);
    },
    endedEvent(event) {
      this.$emit("ended", this.video);
    },
    formatSource(videoID, videoProvider) {
      switch (parseInt(videoProvider)) {
        case 1:
          return (
            "https://www.youtube.com/embed/" +
            videoID +
            "?iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1"
          );
          break;
        case 2:
          return (
            "https://player.vimeo.com/video/" +
            videoID +
            "?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media"
          );
          break;
        default:
          return videoID;
          break;
      }
    },
    formatVideoLink(videoID, videoProvider) {
      switch (parseInt(videoProvider)) {
        case 1:
          return "https://www.youtube.com/watch?v=" + videoID;
          break;
        case 2:
          return "https://vimeo.com/" + videoID;
          break;
        default:
          return videoID;
          break;
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
    skipVideo() {
      if (!this.$auth.loggedIn) {
        this.notificationAdd({
          type: "info",
          message: "Please Login To Vote",
        });
        return;
      }
      let payload = {
        videoID: this.video.id,
        userID: this.$auth.user.id,
        room_id: this.room.id,
      };
      VideoService.skipVideo(payload)
        .then((result) => {
          this.notificationAdd({
            type: "success",
            message: result.data.message,
          });
          this.sendActionToChat("skipped the video");
        })
        .catch((error) => {
          this.notificationAdd({
            type: "info",
            message: error.data.message,
          });
        });
    },
    playNextVideo(newVideo) {
      let provider = this.formatProvider(newVideo.provider);
      this.player.source = {
        type: "video",
        sources: [
          {
            src: newVideo.src,
            provider: provider,
          },
        ],
      };
    },
    sendActionToChat(message) {
      let newMessage = {
        eventMessage: true,
        message: message,
        room_id: this.room.id,
        user: this.$auth.user,
      };
      this.$socket.emit("sendMessage", newMessage);
    },
  },
  computed: {
    ...mapState({
      room: (state) => state.room.room,
    }),
    player() {
      if (this.$refs.plyr) {
        return this.$refs.plyr.player;
      }
    },
  },
  destroyed() {
    if (this.player) {
      this.player.destroy();
    }
  },
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

.muted-link {
  text-decoration: none;
  color: #ffffff !important;
}

.muted-link:hover {
  text-decoration: underline;
  color: #9cbaef !important;
}

.video-background {
  background-color: black;
}

.ytp-pause-overlay {
  display: none;
}
</style>
