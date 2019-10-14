<template>
  <v-row class="videoQue flex-nowrap" dense>
    <v-col v-for="(video, index) in videoQue" :key="index">
      <div>
        <div class="vl"></div>
        <v-img class="white--text queImage" :src="video.image"></v-img>
        <span>{{ video.title }}</span>
        <br />
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'VideoQue',
  props: ['videoQue'],
  data() {
    return {}
  }
}
</script>

<style scoped>
.videoQue {
  overflow-x: scroll;
}
.vl {
  border-left: 3px solid black;
  height: 100%;
}
.queImage {
  width: 5em;
}
</style>
