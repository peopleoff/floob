<template>
  <div>
    <section class="video-background">
      <div id="video-wrapper">
        <vue-plyr
          ref="plyr"
          @ended="endedEvent"
          @ready="readyEvent"
          @seeked="seekedEvent"
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
      // this.player.currentTime = payload;
      console.log(payload);
    },
    playVideo: function(payload) {
      this.player.play();
    },
    pauseVideo: function(payload) {
      this.player.pause();
    }
  },
  data() {
    return {
      userSeeked: true
    };
  },
  methods: {
    seekedEvent: _.debounce(async function(event) {
      let plyr = this.$refs.plyr.player;
      let input = plyr.elements.inputs.seek;
      console.log(plyr);
      let time = await this.getCurrentTime(plyr, input);
      this.seek(time);
      // let payload = {
      //   roomID: this.room.id,
      //   seconds: event.timeStamp
      // };
      // this.$socket.emit("seekVideo", payload);
      // console.log(component);
    }, 30),
    endedEvent(event) {
      this.$emit("ended", this.video);
    },
    async seek(pos) {
      if (pos !== (await this.currentTime())) {
        this.player.currentTime = pos / 1000.0;
      }
    },
    async getCurrentTime(plyr, input) {
      if (typeof input === "object") {
        return (input.value / input.max) * (await plyr.duration);
      } else {
        return Number(input) / 1e3;
      }
    },
    async currentTime() {
      return (await this.player.currentTime) * 1000.0;
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
</style>
