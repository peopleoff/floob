<template>
  <div id="aee" style="height: 100%; width: 100%;">
    <div id="player"></div>
  </div>
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
    onYouTubeIframeAPIReady: function(video) {
      //First remove video player if present
      if (document.getElementById('player')) {
        document.getElementById('player').remove()
      }
      let videoID = video.videoID;
      let videoUserID = video.userID;
      let currentUserID;
      if(this.$store.state.user){
        currentUserID = this.$store.state.user._id;
      }else{
        currentUserID = null;
      }
      //Get video card parent

      let playerCard = document.getElementById('aee');
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
      let player
      player = new YT.Player('player', {
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
      console.log(event);
      event.target.playVideo()
    },
    onApiChange: function(event) {
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
      // immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        //If new array is empty, remove video Player
        if (newValue.length == 0) {
          return document.getElementById('player').remove()
        }
        //If video queue was empty, play new video
        if (oldValue.length == 0) {
          return this.onYouTubeIframeAPIReady(
            this.videoQueue[0]
          )
        }
        //New video added to non-empty array. Do nothing
        if (newValue.length > oldValue.length) {
          return
        }
        this.onYouTubeIframeAPIReady(
          this.videoQueue[0]
        )
      }
    }
  }
}
</script>

<style>
#player {
  height: 100%;
  width: 100%;
}

#noVideo {
  position: absolute;
  top: 30%;
  right: 25%;
  width: 50%;
  height: 50%;
}
</style>
