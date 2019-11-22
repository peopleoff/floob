<template>
  <div id="playerContainer">
    <div id="player"></div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'VideoPlayer',
  props: ['videoQueue'],
  data() {
    return {
      videoPlayer: null
    }
  },
  sockets: {
    syncVideo: function(payload) {
      this.videoPlayer.seekTo(payload, true);
      this.videoPlayer.playVideo();
    }
  },
  methods: {
    onYouTubeIframeAPIReady: function(video) {
      //First remove video player if present
      if (!video) {
        return
      }
      if (document.getElementById('player')) {
        document.getElementById('player').remove()
      }
      let videoID = video.videoID
      let videoUserID = video.user
      let currentUserID
      if (this.$store.state.user) {
        currentUserID = this.$store.state.user.id
      } else {
        currentUserID = null
      }
      //Get video card parent

      let playerCard = document.getElementById('playerContainer')
      //Create video div for API to inject Iframe
      let videoPlayer = document.createElement('div')
      videoPlayer.setAttribute('id', 'player')

      //Append Div to parent
      playerCard.appendChild(videoPlayer)

      //Init Iframe Injection into playerbody
      let controls = 0
      let disablekb = 0
      if (currentUserID == videoUserID) {
        controls = 1
        disablekb = 1
      }
      new YT.Player('player', {
        videoId: videoID,
        playerVars: {
          autoplay: 1,
          controls: controls,
          disablekb: disablekb,
          modestbranding: 1
          // 'start': 60
        },
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
          onApiChange: this.onApiChange
        }
      })
    },
    onPlayerReady: function(event) {
      this.videoPlayer = event.target
      console.log(event);
      event.target.playVideo()
    },
    onApiChange: function(event) {
      console.log(event);
      event.target.playVideo()
    },
    onPlayerStateChange: function(event) {
      console.log(event);
      if (event.data === 3) {
        let payload = {
          roomID: this.$route.params.id,
          seconds: this.getSeconds
        };
        this.$socket.emit('seekVideo', payload)
      }
      if (event.data === 0) {
        this.$socket.emit('removeVideo', this.videoQueue[0])
        this.videoQueue.shift()
      }
    },
    test() {
      console.log(this.videoPlayer)
      console.log(this.videoPlayer.getCurrentTime())
    },
    addRandomVideo() {
      this.$socket.emit('addVideo', newVideo)
    }
  },
  watch: {
    videoQueue: {
      // immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        //If new array is empty, remove video Player
        if (newValue.length == 0) {
          return document.getElementById('player').remove()
        }
        //If video queue was empty, play new video
        if (oldValue.length == 0) {
          return this.onYouTubeIframeAPIReady(this.videoQueue[0])
        }
        //New video added to non-empty array. Do nothing
        if (newValue.length > oldValue.length) {
          return
        }
        this.onYouTubeIframeAPIReady(this.videoQueue[0])
      }
    }
  },
  computed: {
    getSeconds: function() {
      if (this.videoPlayer) {
        return this.videoPlayer.getCurrentTime()
      } else {
        return 0
      }
    }
  }
}
</script>

<style>
#playerContainer {
  height: 100%;
  width: 100%;
  min-height: 60vh;
  border: 1px solid #00bcd4;
}
#player {
  height: 100%;
  width: 100%;
  min-height: 60vh;
}
</style>
