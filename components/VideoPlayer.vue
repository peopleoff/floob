<template>
  <section>
    <vue-plyr ref="plyr" @seeked="seekedEvent" @ended="endedEvent" @ready="readyEvent">
      <div :data-plyr-provider="video.provider" :data-plyr-embed-id="video.src"></div>
    </vue-plyr>
    <div class="d-flex justify-space-between align-center pa-5">
      <div class="roomName">
        <div class="title">{{video.title}}</div>
        <div class="subtitle-1">
          <v-icon>mdi-{{video.provider}}</v-icon>
          {{video.channel}}
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  name: "VideoPlayer",
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  sockets: {
    syncVideo: function(payload) {
      console.log(payload);
      // this.player.forward(payload);
    }
  },
  methods: {
    seekedEvent(event) {
      console.log(event);
      let payload = {
        roomID: this.$route.params.id,
        seconds: event.timeStamp
      };
      this.$socket.emit("seekVideo", payload);
    },
    endedEvent(event) {
      console.log(event);
      this.$emit("ended", this.video);
    },
    readyEvent(event) {
      console.log(event);
      this.player.play();
    },
    playNextVideo(newVideo) {
      console.log(newVideo);
      this.player.source = {
        type: "video",
        sources: [
          {
            src: newVideo.src,
            provider: newVideo.provider
          }
        ]
      };
    }
  },
  watch: {
    video: {
      // immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        console.log(newValue);
        console.log(oldValue);
        // //If new array is empty, remove video Player
        // if (newValue.length == 0) {
        //   // return document.getElementById("player").remove();
        // }
        // //If video queue was empty, play new video
        // if (oldValue.length == 0) {
        //   // return this.onYouTubeIframeAPIReady(this.videoQueue[0]);
        // }
        // //New video added to non-empty array. Do nothing
        // if (newValue.length > oldValue.length) {
        //   return;
        // }
        this.playNextVideo(newValue);
      }
    }
  },
  computed: {
    player() {
      return this.$refs.plyr.player;
    }
  }
};
</script>

<style>
/* #playerContainer {
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
} */
</style>
