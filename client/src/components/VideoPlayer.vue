<template>
  <v-responsive id="player-body" height="100%"></v-responsive>
</template>

<script>
/* eslint-disable */
export default {
  name: 'VideoPlayer',
  props: ['videoQueue'],
  data() {
    return {}
  },
  methods: {
    onYouTubeIframeAPIReady: function(videoId) {
      //First remove video player if present
      console.log(videoId)
      if (document.getElementById('player')) {
        document.getElementById('player').remove()
      };
      //Get video card parent
      
      let playerCard = document.getElementsByClassName(
        'v-responsive__content'
      )[0]
      //Create video div for API to inject Iframe
      let videoPlayer = document.createElement('div')
      videoPlayer.setAttribute('id', 'player')

      //Append Div to parent
      playerCard.appendChild(videoPlayer)

      console.log(playerCard);
      //Init Iframe Injection into playerbody
      let player
      player = new YT.Player('player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0
          // 'start': 60
        },
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange
        }
      })
    },
    onPlayerReady: function(event) {
      event.target.playVideo()
    },
    onPlayerStateChange: function(event) {
      if (event.data === 0) {
        this.$socket.emit('removeVideo', this.videoQueue[0])
        this.videoQueue.shift()
      }
    },
    addRandomVideo() {
      this.$socket.emit('addVideo', newVideo)
    }
  },
  watch: {
    videoQueue: {
    //   immediate: true,
      deep: true,
      handler(nv, ov) {
          console.log(nv);
          console.log(ov);
        //If new array is empty, remove video Player
        if (nv.length === 0) {
          return document.getElementById('player').remove()
        }
        //If video queue was empty, play new video
        if (!ov) {
          return this.onYouTubeIframeAPIReady(this.videoQueue[0].videoID)
        }
        //New video added to non-empty array. Do nothing
        if (nv.length > ov.length) {
          return
        }
        this.onYouTubeIframeAPIReady(this.videoQueue[0].videoID)
      }
    }
  }
}
</script>

<style>
#player {
  height: 100%;
  width: 100%;
  padding: 10px;
}

#noVideo {
  position: absolute;
  top: 30%;
  right: 25%;
  width: 50%;
  height: 50%;
}
</style>
