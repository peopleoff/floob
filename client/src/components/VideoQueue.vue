<template>
  <div>
    <h4>Video Queue({{queue.length}})</h4>
    <v-row class="flex-nowrap videoQue" dense>
      <v-col
        v-for="(video, index) in queue"
        :key="index"
        cols="2"
        class="videoImage"
      >
        <v-card class="mx-auto">
          <v-img :src="video.image" :height="imageHeight"></v-img>

          <v-card-text class="videoTitle">
            <div>{{ video.title }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- <v-col cols="2" class="nextVideo">
        <v-img :src="nextVideo.image" :height="imageHeight"></v-img>
      </v-col>
      <v-col v-for="(video, index) in queue" :key="index" cols="2" class="videoImage">
        <v-img :src="video.image" :height="imageHeight"></v-img>
        <div class="videoTitle">
          test
        </div>
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'videoQueue',
  props: ['videoQueue'],
  data() {
    return {}
  },
  computed: {
    queue() {
      let videos = []
      this.videoQueue.forEach((element, index) => {
        if (index !== 0) {
          videos.push(element)
        }
      })
      return videos
    },
    nextVideo() {
      return this.videoQueue[1]
    },
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '3rem'
        case 'sm':
          return '4rem'
        case 'md':
          return '5rem'
        case 'lg':
          return '6rem'
        case 'xl':
          return '7rem'
      }
    }
  }
}
</script>

<style scoped>
.v-card__text {
  width: auto;
  padding: 0;
}
.videoQue {
  overflow-x: scroll;
  scroll-behavior: smooth;
  font-size: 14px;
  min-height: 5rem;
  border-top: 1px solid white;
}
.videoTitle {
  position: fixed;
  bottom: -100px;
}

.videoQue > div:first-child {
  color: red;
}
.vl {
  border-left: 3px solid black;
  height: 100%;
}
.queCard {
  height: 5rem;
}
.nextVideo {
  border-top: 2px solid white;
}
</style>
