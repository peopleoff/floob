<template>
  <div class="d-flex flex-column h100 w100">
    <!-- Video Search -->
    <div class="ma-2">
      <v-text-field
        flat
        hide-details
        outlined
        prepend-inner-icon="mdi-youtube"
        label="Video Link"
        full-width
        v-model="video"
        @keydown.enter="addVideo"
      ></v-text-field>
    </div>
    <!-- Video Player -->
    <div class="ma-2 flex-grow-1" id="messages">
      <div v-for="message in messages" :key="message.id">
        <span class="primary--text">{{ message.username }}</span>
        <span>: {{ message.message }}</span>
      </div>
    </div>
    <!-- Video Actions -->
    <div class="ma-2">
      <v-text-field
        flat
        hide-details
        outlined
        append-icon="mdi-emoticon"
        label="Say Something..."
        full-width
        v-model="message"
        @keydown.enter="addMessage"
      ></v-text-field>
      <v-icon style="float: right;">mdi-settings</v-icon>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Chat',
  data() {
    return {
      message: '',
      messages: [],
      video: ''
    }
  },
  sockets: {
    newMessage: function(payload) {
      this.messages.push(payload)
    }
  },
  methods: {
    ...mapMutations(['UPDATE_SNACKBAR', 'TOGGLE_FORM']),
    getVideoID(name, url) {
      if (url.includes('youtu.be')) {
        let index = 0
        //Mobile Link
        let firstCheck = url.split('/')[url.split('/').length - 1]
        if (firstCheck.length > 0) {
          index = url.split('/').length - 1
        } else {
          index = url.split('/').length - 2
        }
        let videoID = url.split('/')[index]
        return videoID
      }
      if (!url) url = window.location.href
      name = name.replace(/[\[\]]/g, '\\$&')
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    },
    addMessage() {
      if (!this.loggedIn) {
        this.TOGGLE_FORM()
        return
      }
      if (this.message) {
        let newMessage = {
          message: this.message,
          roomID: this.$route.params.id,
          user: this.$store.state.user
        }
        this.$socket.emit('addMessage', newMessage)
        this.message = ''
        let container = document.querySelector('#messages')
        container.scrollTop = container.scrollHeight
      }
    },
    addVideo() {
      if (!this.loggedIn) {
        this.UPDATE_SNACKBAR({
          type: 'info',
          message: 'Please Login first',
          x: 'right',
          y: 'top'
        })
        return
      }
      let user = this.$store.state.user
      let videoID = this.getVideoID('v', this.video)
      let newVideo = {
        videoLink: videoID,
        pure: true,
        roomID: this.$route.params.id,
        user: this.$store.state.user
      }
      this.$socket.emit('addVideo', newVideo)
      this.video = ''
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style scoped>
.w100 {
  width: 100% !important;
}
#messages {
  max-height: 80vh;
  overflow-y: scroll;
  font-size: 14px;
}
</style>
