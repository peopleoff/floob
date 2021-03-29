<template>
  <video id="videoPlayer"></video>
</template>

<script>
import Hls from "hls.js";
export default {
  props: ["video"],
  mounted() {
    var videoPlayer = document.querySelector("#videoPlayer");
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(this.video);
      hls.attachMedia(videoPlayer);
    }
  },
};
</script>

<style>
</style>