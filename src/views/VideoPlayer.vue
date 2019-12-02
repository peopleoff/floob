<template>
  <div class="videojs">
    <h1>{{ title }}</h1>

    <div class="video-inner-container">
      <video
        id="vid1"
        controls
        autoplay
        preload="auto"
        width="640"
        height="264"
        class="video-js vjs-fluid vjs-default-skin vjs-big-play-centered"
        data-setup="{}"
      >
        <source :src=src :type=type>
      </video>
    </div>
  </div>
</template>

<script>
import 'videojs-youtube/dist/Youtube.min.js'
import 'video.js/dist/video-js.min.css'
import 'video.js/dist/video.min.js'
export default {
  name: 'VideoJS',
  data() {
    return {
      title: 'Video',
      src: 'https://www.youtube.com/watch?v=1fws3rkiS7A',
      type: 'video/youtube'
    }
  }
}
</script>
