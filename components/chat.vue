<template>
  <div class="d-flex flex-column h100 w100">
    <!-- Video Search -->
    <div class="ma-2 d-flex flex-row justify-space-between align-center">
      <v-btn icon tile @click="toggleChat" class="hidden-sm-and-down">
        <v-icon>mdi-arrow-collapse-right</v-icon>
      </v-btn>
      <div>Chat</div>
      <v-btn icon tile>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
    </div>
    <div class="ma-2" id="messages" v-if="!showUsers">
      <div id="userInfo">
        Test
      </div>
      <div class="font-weight-thin" style="color: #9e9e9e">
        Welcome To Chat!
      </div>
      <div v-for="message in messages" :key="message.id">
        <span
          class="primary--text message"
          @click="clickMessage(message, $event)"
          >{{ message.username }}</span
        >
        <span>: {{ message.message }}</span>
      </div>
    </div>
    <div class="ma-2 h100" id="users" v-if="showUsers">
      <div class="font-weight-thin" style="color: #9e9e9e">Current Users</div>
      <div v-for="user in currentViewers" :key="user.id">
        <span class="primary--text">{{ user.currentViewers.username }}</span>
      </div>
    </div>
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

export default {
  name: 'Chat',
  data() {
    return {
      message: '',
      messages: [],
      currentViewers: [],
      video: '',
      hideChat: false,
      showUsers: false
    }
  },
  methods: {
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
        this.SHOW_LOGIN_FORM()
        return
      }
      if (this.message) {
        let newMessage = {
          message: this.message,
          roomID: this.$route.params.id,
          user: this.$store.state.user
        }
        this.message = ''
        let container = document.querySelector('#messages')
        container.scrollTop = container.scrollHeight
      }
    },
    toggleChat() {
      this.$emit('toggleChat')
    },
    clickMessage(chat, event) {
      let info = document.getElementById('userInfo')
      console.log(chat);
      // info.style.display = 'block'
      // info.style.top = event.layerY + 20 + 'px'
    },
  },
  computed: {
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
.emoji-mart-bar {
  display: none;
}
#messages {
  height: 75vh;
  overflow-y: scroll;
  font-size: 14px;
  position: relative;
}
.message {
  cursor: pointer;
}
#users {
  max-height: 75.5vh;
  overflow-y: scroll;
  font-size: 14px;
}
#userInfo {
  display: none;
  position: absolute;
  width: 100%;
  height: 100px;
  background: green;
}

@media only screen and (max-width: 959px) {
  #messages {
    height: 120px;
  }
}
</style>
