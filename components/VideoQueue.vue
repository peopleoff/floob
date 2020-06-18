<template>
  <section>
    <h3>Queue ({{videoQueue.length}})</h3>
    <hr />
    <div class="d-flex flex-wrap">
      <v-card v-for="video in videoQueue" :key="video.id" width="300" class="ma-2">
        <v-img class="white--text align-end" height="150px" :src="video.image"></v-img>

        <v-card-subtitle>
          <v-icon>mdi-{{formatProvider(video.provider)}}</v-icon>
          {{video.channel}}
        </v-card-subtitle>

        <v-card-text class="text--primary" v-html="video.title"></v-card-text>
      </v-card>
    </div>
  </section>
</template>

<script>
export default {
  name: "videoQueue",
  props: ["videoQueue"],
  data() {
    return {};
  }
};
</script>

<style>
</style>
