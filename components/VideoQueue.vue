<template>
  <section>
    <h3 class="ma-2">Queue ({{videoQueue.length}})</h3>
    <hr />
    <div class="d-flex flex-wrap">
      <v-card v-for="video in videoQueue" :key="video.id" class="ma-2" max-width="300">
        <v-img
          class="white--text align-end"
          height="150px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        ></v-img>

        <v-card-subtitle class="pb-0">
          <v-icon>mdi-{{video.provider}}</v-icon>
          {{video.channel}}
          </v-card-subtitle>

        <v-card-text class="text--primary">{{video.title}}</v-card-text>
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
