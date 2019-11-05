<template>
  <div class="d-flex flex-column h100 w100">
    <!-- Video Search -->
    <div class="ma-2 d-flex flex-row justify-space-between align-center">
      <v-btn icon tile @click="toggleChat">
        <v-icon>mdi-arrow-collapse-right</v-icon>
      </v-btn>
      <div>
        Chat
      </div>
      <v-btn icon tile>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
    </div>
    <!-- Video Player -->
    <div class="ma-2 flex-grow-1" id="messages">
      <div class="font-weight-thin" style="color: #9e9e9e">
        Welcome To Chat!
      </div>
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
        label="Say Something..."
        full-width
        v-model="message"
        @keydown.enter="addMessage"
      ></v-text-field>
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
      video: '',
      hideChat: false,
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
    toggleChat() {
      this.$emit('toggleChat')
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
    },
    chatSize: function() {
      if (this.hideChat) {
        return 'd-none pa-0'
      } else {
        return 'col-lg-2 pa-0'
      }
    },
    chatTooltip() {
      if (this.hideChat) {
        return 'Show Chat'
      } else {
        return 'Hide Chat'
      }
    }
  }
}
</script>

<style scoped>
.w100 {
  width: 100% !important;
}
.emoji-mart-bar{
  display: none;
}
#messages {
  max-height: 80vh;
  overflow-y: scroll;
  font-size: 14px;
}
</style>
