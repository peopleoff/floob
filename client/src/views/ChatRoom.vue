<template>
  <main>
    <section class="section section-shaped section-lg">
      <div class="shape shape-style-1 bg-gradient-default">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container-fluid">
        <div class="row justify-content-center align-items-center">
          <div class="col-8 col-md-9" id="left-side">
            <i class="ni ni-bold-right close-icon" id="close-icon" v-on:click="closeRight()"></i>
            <h4 id="video-title" v-if="videoQueue.length !== 0">{{videoQueue[0].video.videoTitle}} --
              {{videoQueue[0].user.username}}</h4>
            <div class="card bg-secondary shadow border-0 video-card">
              <div class="card-body" id="player-body">
                <h1 v-if="videoQueue.length === 0">No videos current in Queue</h1>
                <div id="player"></div>
              </div>
              <div class="card-footer" v-if="videoQueue.length !== 0">
                <button type="button" class="btn btn-danger" v-on:click="voteToSkip()">Skip Video ({{skipCounter}})</button>
              </div>
            </div>
          </div>
          <div class="col-4 col-md-3" id="right-side">
            <div class="card bg-secondary shadow border-0 chat-card">
              <div class="card-body chat-container">
                <div class="users">
                  <h4>Users</h4>
                  <p class="users" v-for="user in users" v-bind:key="user._id" v-bind:style="{color: randomColor.randomColorHex}">
                    {{user.username}}
                  </p>
                </div>
                <div class="queue">
                  <h4>Queue</h4>
                  <span v-for="(video,index) in videoQueue" v-bind:key="video._id" v-if="index !== 0">
                    {{index}}: {{video.video.videoTitle}} - {{video.user.username}}
                    <hr align="left" width="75%">
                  </span>
                </div>
                <div class="add">
                  <form role="form" v-on:submit.prevent="addVideo()">
                    <div class="form-group mb-3">
                      <div class="input-group input-group-alternative">
                        <div class="input-group-prepend">
                          <span class="input-group-text"><i class="ni ni-button-play"></i></span>
                        </div>
                        <input class="form-control" placeholder="Video Link" type="text" v-model="videoInput">
                      </div>
                    </div>
                    <div class="text-center">
                      <button type="button" class="btn btn-primary" v-on:click="addVideo()" v-on:keyup.enter="addVideo()">Add
                        Video</button>
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
  export default {
    name: 'ChatRoom',
    data() {
      return {
        user: '',
        username: '',
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
        }, 5000);
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
        var randomColorHex = "#000000".replace(/0/g, function () {
          return (~~(Math.random() * 16)).toString(16);
        });
        console.log(randomColorHex);
        return randomColorHex;
      },
      voteToSkip: function () {
        this.$socket.emit('voteToSkip', this.videoQueue[0]);
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
        if (this.videoInput == '') {
          let data = {
            message: 'No Video Added',
            type: "danger"
          }
          this.status = data;
          setTimeout(function () {
            self.status = '';
          }, 5000);
          return
        }
        this.$socket.emit('addVideo', {
          user: this.$store.state.user,
          video: this.getVideoID("v", this.videoInput)
        });
        this.videoInput = '';
      },
      clearQueue: function () {
        this.$socket.emit('clear');
        this.videoInput = '';
      },
      removeVideo: function () {
        this.$socket.emit('removeVideo', this.videoQueue[0]);
      },
      signIn: function () {
        this.$socket.emit('signIn', {
          user: this.$store.state.user
        });
      },
      closeRight: function(){
        document.getElementById('close-icon').classList.toggle('closed');
        document.getElementById('right-side').classList.toggle('hidden');
        document.getElementById('left-side').classList.toggle('col-11');
        document.getElementById('left-side').classList.toggle('col-md-11');
      },
      memberMe: function () {
        var username = localStorage.getItem('username');
        if (username) {
          this.$socket.emit('signIn', {
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
            'controls': 1
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
      this.signIn();
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

  .btn-primary{
    width: 100%;
  }

  .hidden{
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
    text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
    top: -5%;
    left: 2%;
    color: white;
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
    align-items: center;
  }

  .users {
    margin: 10px 0;
    overflow: auto;
  }

  .queue {
    margin: 10px 0;
    overflow: auto;
  }
</style>