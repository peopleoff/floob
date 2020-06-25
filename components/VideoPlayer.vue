<template>
  <section>
    <vue-plyr ref="plyr" @ended="endedEvent" @ready="readyEvent">
      <div :data-plyr-provider="formatProvider(video.provider)" :data-plyr-embed-id="video.src"></div>
    </vue-plyr>
    <div class="d-flex justify-space-between align-center">
      <div class="roomName">
        <div class="title">{{video.title}}</div>
        <div class="subtitle-1">
          <v-icon>mdi-{{formatProvider(video.provider)}}</v-icon>
          <a :href="video.channelLink" target="_blank">{{video.channel}}</a>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "VideoPlayer",
  props: ["video"],
  sockets: {
    syncVideo: function(payload) {
      // console.log(payload);
      // this.player.seekTime = payload;
      const currentTime = this.player.currentTime;
      const seekedTime = payload;
      const newTime = seekedTime - currentTime;
      console.log(this.player);
      // this.player.forward(1);
      this.player.currentTime = 500;
      // this.player.forward(payload);
    }
  },
  methods: {
    seekedEvent(event) {
      console.log(event);
      event.preventDefault();
      let payload = {
        roomID: this.room.id,
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
    ...mapState({
      room: state => state.room.room
    }),
    player() {
      return this.$refs.plyr.player;
    }
  },
  mounted() {
    this.player.on("seeked", () => this.seekedEvent());
  },
  destroyed() {
    this.player.destroy();
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
