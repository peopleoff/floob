<template>
  <section>
    <vue-plyr ref="plyr" @seeked="seekedEvent" @ended="endedEvent" @ready="readyEvent">
      <div :data-plyr-provider="formatProvider(video.provider)" :data-plyr-embed-id="video.src"></div>
    </vue-plyr>
    <div class="d-flex justify-space-between align-center">
      <div class="roomName">
        <div class="title">{{video.title}}</div>
        <div class="subtitle-1">
          <v-icon>mdi-{{formatProvider(video.provider)}}</v-icon>
          {{video.channel}}
        </div>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  name: "VideoPlayer",
  props: ["video"],
  sockets: {
    syncVideo: function(payload) {
      // console.log(payload);
      // this.player.forward(payload);
    }
  },
  methods: {
    seekedEvent(event) {
      let payload = {
        roomID: this.$route.params.id,
        seconds: event.timeStamp
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
