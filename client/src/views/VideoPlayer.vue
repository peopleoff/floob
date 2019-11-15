<template>
  <div>
    <new-video-player :options="videoOptions" />
  </div>
</template>

<script>
import NewVideoPlayer from '@/components/NewVideoPlayer.vue'

export default {
  name: 'VideoExample',
  components: {
    NewVideoPlayer
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: '/path/to/video.mp4',
            type: 'video/mp4'
          }
        ]
      }
    }
  }
}
</script>

<style></style>
