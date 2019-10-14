<template>
  <div>
    <v-flex v-for="video in listQue" v-bind:key="video._id" xs12>
      <v-card class="white--text" flat>
        <v-layout>
          <v-flex xs2 hidden-md-and-down>
            <v-img :src="video.image" height="100%" contain></v-img>
          </v-flex>
          <v-flex xs10 md12>
            <v-card-text>
              <div>{{ video.title }}</div>
              <div class="caption">
                <v-layout>
                  <v-flex xs6 class="text-xs-left"
                    >- {{ video.channel }}</v-flex
                  >
                  <v-flex xs6 class="text-xs-right">{{
                    video.username
                  }}</v-flex>
                </v-layout>
              </div>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider light></v-divider>
      </v-card>
    </v-flex>
    <v-flex>
      <form v-on:submit.prevent="addVideo()" v-if="this.$store.state.user">
        <v-text-field
          label="Video Link"
          append-icon="play_arrow"
          @click:append="addVideo"
          v-model="videoLink"
        ></v-text-field>
      </form>
      <v-btn
        block
        v-if="!this.$store.state.user"
        to="/login"
        class="secondary_text"
        >Sign In</v-btn
      >
    </v-flex>
  </div>
</template>

<script>
export default {
  name: 'VideoQueue',
  props: ['videoQueue'],
  data() {
    return {
      videoLink: '',
      message: '',
      queueActive: true,
      chatActive: false
    }
  },
  methods: {
    addVideo() {
      if (this.videoLink) {
        let newVideo = {
          videoLink: this.videoLink,
          roomID: this.$route.params.id,
          user: this.$store.state.user
        }
        this.snackbar = true
        this.snackbarMessage = 'Video Added'
        this.$socket.emit('addVideo', newVideo)
        this.videoLink = ''
      }
    },
    addMessage() {
      if (this.message) {
        let newMessage = {
          message: this.message,
          roomID: this.$route.params.id,
          user: this.$store.state.user
        }
        this.$socket.emit('addMessage', newMessage)
        this.message = ''
      }
    },
    showChat() {
      this.chatActive = true
      this.queueActive = false
    },
    showQueue() {
      this.queueActive = true
      this.chatActive = false
    }
  },
  computed: {
    listQue() {
      return this.videoQueue
    }
  }
}
</script>

<style scoped>
#videoQueue {
  overflow: auto;
  max-height: 70%;
}

.pressed {
  border-bottom: 1px solid white;
}

.queueTitle {
  cursor: pointer;
}

.queueTitle button {
  width: 50%;
  margin: 0;
}

#queueList {
  flex-grow: 3500;
  overflow-y: scroll;
}

.sideBar div {
  width: 100%;
}

.active {
  background: green;
}

.word-break-all {
  word-break: break-all;
}

.videoQueue {
  height: 80vh;
}

.height-0 {
  height: 0%;
}

.height-5 {
  height: 5%;
}

.height-10 {
  height: 10%;
}

.height-15 {
  height: 15%;
}

.height-20 {
  height: 20%;
}

.height-60 {
  height: 60%;
}

.height-80 {
  height: 80%;
}

@media only screen and (max-width: 959px) {
  .videoQueue {
    height: 100%;
    transition: 0ms;
    margin: 0 !important;
  }
}
</style>
