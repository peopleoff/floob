<template>
  <v-row class="videoQue flex-nowrap" dense>
    <v-col v-for="(video, index) in queue" :key="index" cols="2">
      <div>
        <div class="vl"></div>
        <v-img class="white--text queImage" :src="video.image"></v-img>
        <span>{{ video.title }}</span>
        <br />
        <span class="primary--text">- {{ video.channel }}</span>
        <br />
      </div>
    </v-col>
  </v-row>
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
      let videos = []
      this.videoQueue.forEach((element, index) => {
        if (index === 1) {
          videos.push(element)
        }
      })
      return videos
    }
  }
}
</script>

<style scoped>
.videoQue {
  overflow-x: scroll;
  font-size: 14px;
}
.vl {
  border-left: 3px solid black;
  height: 100%;
}
</style>
