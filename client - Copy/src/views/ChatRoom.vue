<template>
  <main>
    <alert v-if="status" :message="status.message" :type="status.type"></alert>
    <section class="section section-shaped section-lg">
      <div class="container-fluid">
        <div class="row justify-content-center align-items-center">
          <div class="col-12 col-lg-9" id="left-side">
            <i class="ni ni-bold-right close-icon d-md-none" id="close-icon" v-on:click="closeRight()"></i>
            <h4 id="video-title" v-if="videoQueue.length !== 0">{{videoQueue[0].video.videoTitle}} --
              {{videoQueue[0].user.username}}</h4>
            <div class="card bg-secondary shadow border-0 video-card">
              <div class="card-body" id="player-body">
                <h1 v-if="videoQueue.length === 0">No videos current in Queue</h1>
                <div id="player"></div>
              </div>
              <div class="card-footer" v-if="videoQueue.length !== 0">
                <button type="button" class="btn btn-danger" v-on:click="voteToSkip()" data-toggle="tooltip"
                  data-placement="top" title="Majority vote needed to skip videos.">Vote To Skip ({{skipCounter}})</button>
              </div>
            </div>
          </div>
          <div class="col-md-3 d-md-none d-lg-block" id="right-side">
            <div class="card bg-secondary shadow border-0 chat-card">
              <div class="card-body" v-if="!this.$store.state.user">
                <h1>Please
                  <router-link to="/signin"><a>Sign In</a></router-link> to add videos to the queue
                </h1>
              </div>
              <div class="card-body chat-container" v-else>
                <div class="queue">
                  <h4>Queue</h4>
                  <div class="que-card border-bottom" v-for="(video,index) in videoQueue" v-bind:key="video._id" v-if="index !== 0">
                    <div class="que-card-horizontal">
                      <div class="img-square-wrapper">
                        <img class="que-image" v-bind:src="video.video.thumbnailURL" alt="Card image cap">
                      </div>
                      <div class="que-card-body">
                        <p class="que-card-title">{{video.video.videoTitle}}</p>
                        <p class="que-card-text">-{{video.video.videoChannel}}</p>
                        <small class="text-muted que-added-by">{{video.user.username}}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="add">
                  <form role="form" v-on:submit.prevent="addVideo()">
                    <div class="form-group mb-3">
                      <div class="input-group input-group-alternative border-bottom">
                        <div class="input-group-prepend">
                          <span class="input-group-text input-transparent">
                            <eva-icon name="play-circle" fill="#8898aa"></eva-icon>
                          </span>
                        </div>
                        <input class="form-control input-transparent" placeholder="Video Link" type="text" v-model="videoInput">
                      </div>
                    </div>
                    <div class="text-center">
                      <div class="btn btn-primary" id="addVideo" v-on:click="addVideo()" v-on:keyup.enter="addVideo()">
                        Add Video
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  // @ is an alias to /src
  import Alert from '@/components/Alert.vue'
  export default {
    name: 'ChatRoom',
    components: {
      Alert
    },
    data() {
      return {
        user: '',
        username: '',
        searchResult: '',
        isConnected: false,
        status: '',
        videoInput: '',
        videoQueue: [],
        users: [],
        skipCounter: 0
      }
    },
    sockets: {
      connect() {
        // Fired when the socket connects.
        this.isConnected = true;
      },

      disconnect() {
        this.isConnected = false;
      },

      // Fired when the server sends something on the "messageChannel" channel.
      status(data) {
        let self = this;
        this.status = data;
        setTimeout(function () {
          self.status = '';
        }, 2500);
      },
      usersChanged(data) {
        if (data.username !== this.$store.state.user.username) {
          let self = this;
          this.status = data.status;
          setTimeout(function () {
            self.status = '';
          }, 2500);
        }
      },
      cleared() {
        this.videoQueue = [];
        document.getElementById("player").remove();
      },
      signedIn(data) {
        this.user = data.response;
      },
      voteToSkipCounter(data) {
        this.skipCounter = data;
      },
      videoOutput(data) {
        this.videoQueue = data;
      },
      searchResult(data) {
        this.searchResult = data;
      },
      usersOutput(data) {
        this.users = data;
      },
    },
    methods: {
      formatUrl: function (url) {
        if (url.includes("watch?v=")) {
          return url.replace("watch?v=", "embed/")
        } else {
          return url
        }
      },
      randomColor: function () {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      },
      voteToSkip: function () {
        this.$socket.emit('voteToSkip', this.videoQueue[0], this.$store.state.user);
      },
      getVideoID: function (name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
      },
      addVideo: function () {
        let self = this;
        let videoID = '';
        if (this.videoInput == '') {
          let data = {
            message: ['No Video Added'],
            type: "danger"
          }
          this.status = data;
          setTimeout(function () {
            self.status = '';
          }, 2500);
          return
        }
        //Check for playlist first
        if (this.videoInput.includes("playlist")) {
          let playlistID = this.getVideoID("list", this.videoInput);
          this.$socket.emit('addPlaylist', {
            user: this.$store.state.user,
            playlistID: playlistID
          });
          this.videoInput = '';
          return;
        }

        //Get video ID based on mobile link or desktop URL.
        if (this.videoInput.includes("youtu.be")) {
          //Mobile Link
          videoID = this.videoInput.split("/")[this.videoInput.split("/").length - 1];
        } else {
          //Desktop URL
          videoID = this.getVideoID("v", this.videoInput);
        }
        this.$socket.emit('addVideo', {
          user: this.$store.state.user,
          video: videoID
        });
        this.videoInput = '';
      },
      searchVideos: function () {
        this.$socket.emit('searchVideos', {
          search: 'lil wayne'
        });
      },
      clearQueue: function () {
        this.$socket.emit('clear');
        this.videoInput = '';
      },
      removeVideo: function () {
        this.$socket.emit('removeVideo', this.videoQueue[0]);
      },
      login: function () {
        this.$socket.emit('login', {
          user: this.$store.state.user
        });
      },
      closeRight: function () {
        document.getElementById('close-icon').classList.toggle('closed');
        document.getElementById('right-side').classList.toggle('hidden');
        document.getElementById('left-side').classList.toggle('col-11');
        document.getElementById('left-side').classList.toggle('col-md-11');
      },
      memberMe: function () {
        var username = localStorage.getItem('username');
        if (username) {
          this.$socket.emit('login', {
            user: username
          });
        }
      },
      onYouTubeIframeAPIReady: function (videoId) {
        if (document.getElementById("player")) {
          document.getElementById("player").remove();
        }
        let playercard = document.getElementById("player-body");
        var btn = document.createElement("div");
        btn.setAttribute("id", "player");
        playercard.appendChild(btn);
        let player;
        player = new YT.Player('player', {
          videoId: videoId,
          playerVars: {
            'autoplay': 1,
            'controls': 1,
            // 'start': 60
          },
          events: {
            'onReady': this.onPlayerReady,
            'onStateChange': this.onPlayerStateChange
          }
        });
      },
      onPlayerReady: function (event) {
        event.target.playVideo();
      },
      onPlayerStateChange: function (event) {
        if (event.data === 0) {
          this.$socket.emit('removeVideo', this.videoQueue[0]);
          this.videoQueue.shift();
        }
      },
      stopVideo: function (event) {
        event.target.stopVideo();
      }
    },
    mounted() {
      this.memberMe();
      this.login();
    },
    computed: {
      nextVideo() {
        let nextVideo = this.videoQueue[0];
        return this.formatUrl(nextVideo);
      },
      emptyQueue() {
        if (this.videoQueue.length === 0) {
          return true
        }
        return false;
      }
    },
    watch: {
      isConnected(nv, ov) {
        if (!nv) {
          this.$socket.emit('disconnect', this.user);
        }
      },
      videoQueue: {
        handler(nv, ov) {
          if (nv.length === 0) {
            document.getElementById("player").remove();
            return
          }
          if (ov.length == 0) {
            this.onYouTubeIframeAPIReady(this.videoQueue[0].video.videoID);
            return
          }

          if (nv.length > ov.length) {
            return
          }
          this.onYouTubeIframeAPIReady(this.videoQueue[0].video.videoID);
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  #addVideo:active {
    -webkit-animation: bounce 1s;
    animation: bounce 1s;
  }

  main {
    background-image: url('../../public/img/chrismas.png');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
  }


  .section-lg {
    padding-top: 7rem;
    padding-bottom: 4.7rem;
  }

  form {
    width: 100%;
  }

  #close-icon {
    position: absolute;
    top: 0.5%;
    color: white;
    right: -1%;
    z-index: 10;
    cursor: pointer;
    -moz-transition: all .25s linear;
    -webkit-transition: all .25s linear;
    transition: all .25s linear;
  }

  .btn-primary {
    width: 100%;
  }

  .hidden {
    display: none;
  }

  #close-icon.closed {
    -ms-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .card-body {
    padding: 0.5rem;
  }

  .card-footer {
    background: transparent;
    padding: .5rem 0;
  }

  #video-title {
    position: absolute;
    top: -4%;
    left: 2%;
    font-size: 100%;
  }

  h1 {
    text-align: center;
    margin-top: 15%;
  }

  hr {
    border: 1px solid #5e72e4;
    margin: 5px 0;
  }

  .sign-in {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .add {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .queue {
    margin: 10px 0;
    overflow: auto;
  }

  .queue h4 {
    border-bottom: 1px solid #707070;
  }

  .que-card-horizontal {
    display: flex;
  }

  .que-card {
    border: 1px solid red;
    margin: 10px 0;
  }

  .que-added-by {
    float: right;
  }

  .que-card-body {
    padding: 0.75rem;
    width: 100%;
  }

  .que-card-body p {
    font-size: 14px;
    margin: 0;
  }

  .img-square-wrapper {
    display: flex;
    align-items: center;
  }

  .que-image {
    height: 75px;
    width: 75px;
  }

  .que-added-by {
    float: right;
  }

  @media (max-width: 1200px) {
    .que-card-body p {
      font-size: 12px;
    }

    .que-image {
      height: 50px;
      width: 50px;
    }
  }


  @media (max-width: 991.98px) {
    .section-lg {
      padding-top: 6rem;
      padding-bottom: 4.5rem;
    }

    .que-card-body p {
      font-size: 14px;
    }

    .que-image {
      height: 25px;
      width: 25px;
    }
  }

  @media (max-width: 768px) {
    .que-card-body p {
      font-size: 16px;
    }
  }

  @media (max-width: 576px) {}
</style>