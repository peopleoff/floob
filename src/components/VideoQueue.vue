<template>
  <div>
    <h4>Video Queue({{ queue.length }})</h4>
    <v-row class="flex-nowrap videoQue pb-4" dense>
      <v-col
        v-for="(video, index) in queue"
        :key="index"
        cols="2"
        class="videoImage"
      >
        <v-img :src="video.image" :height="imageHeight" aspect-ratio="1.7778"></v-img>
        <div class="overlay">
          {{video.title}}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "videoQueue",
  props: ["videoQueue"],
  data() {
    return {};
  },
  computed: {
    queue() {
      let videos = [];
      this.videoQueue.forEach((element, index) => {
        if (index !== 0) {
          videos.push(element);
        }
      });
      return videos;
    },
    nextVideo() {
      return this.videoQueue[1];
    },
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "3rem";
        case "sm":
          return "4rem";
        case "md":
          return "5rem";
        case "lg":
          return "6rem";
        case "xl":
          return "7rem";
      }
    }
  }
};
</script>

<style>
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: #1e162c;
}
.videoImage:hover .overlay {
  opacity: 0.8;
}
.videoImage{
  position: relative;
}
.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
.videoQue {
  overflow-x: scroll;
  scroll-behavior: smooth;
  font-size: 14px;
  min-height: 5rem;
  border-top: 1px solid white;
}
</style>
