<template>
  <section class="py-3">
    <h3>Queue ({{videoQueue.length}})</h3>
    <div id="video-list" class="d-flex flex-wrap">
      <v-card v-for="video in videoQueue" :key="video.id" width="300" class="ma-3 video-card">
        <v-img class="white--text align-end" height="150px" :src="video.image"></v-img>

        <v-card-title>
          <v-icon>mdi-{{formatProvider(video.provider)}}</v-icon>
          {{video.channel}}
        </v-card-title>
        <v-card-subtitle>added by {{video.userInfo.username}}</v-card-subtitle>

        <v-card-text class="text--primary" v-html="video.title"></v-card-text>
      </v-card>
      <!-- 
        Add card when queue is empty for random video
        <v-card width="300" class="ma-3 video-card">
        <v-img class="white--text align-end" height="150px" src="https://via.placeholder.com/150"></v-img>

        <v-card-title class="justify-center">
          <v-btn>Add Random Video</v-btn>
        </v-card-title>

      </v-card> -->
    </div>
  </section>
</template>

<script>
export default {
  name: "videoQueue",
  props: ["videoQueue"],
  data() {
    return {};
  },
};
</script>

<style>
#video-list .video-card {
  margin-left: 0 !important;
  background: #1e142d;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
