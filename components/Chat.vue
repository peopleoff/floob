<template>
  <div class="d-flex flex-column justify-space-around h100">
    <!-- Video Search -->
    <div class="d-flex flex-row justify-space-between align-center">
      <v-btn icon tile @click="toggleChat" class="hidden-sm-and-down">
        <v-icon>mdi-arrow-collapse-right</v-icon>
      </v-btn>
      <div>Chat</div>
      <v-btn icon tile>
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
    </div>
    <div class="ma-2" id="messages">
      <div id="userInfo">Test</div>
      <div class="font-weight-thin" style="color: #9e9e9e">Welcome To Chat!</div>
      <div v-for="message in messages" :key="message.id">
        <span
          class="primary--text message"
          @click="clickMessage(message, $event)"
        >{{ message.username }}</span>
        <span>: {{ message.message }}</span>
      </div>
    </div>
    <div class="ma-2">
      <v-text-field
        flat
        hide-details
        outlined
        label="Say Something..."
        append-icon="mdi-send"
        full-width
        v-model="message"
        @click:append="sendMessage"
        @keydown.enter="sendMessage"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Chat",
  data() {
    return {
      message: "",
      messages: [],
      hideChat: false
    };
  },
  sockets: {
    newMessage: function(message) {
      this.messages.push(message);
    }
  },
  methods: {
    sendMessage() {
      if (this.message && this.loggedIn) {
        let newMessage = {
          message: this.message,
          roomID: this.$route.params.id,
          user: this.user
        };
        this.$socket.emit("sendMessage", newMessage);
        this.message = "";
        let container = document.querySelector("#messages");
        container.scrollTop = container.scrollHeight;
      }
    },
    toggleChat() {
      this.$emit("toggleChat");
    }
  },
  computed: {
    ...mapGetters({
      loggedIn: "user/loggedIn",
      user: "user/user"
    })
  }
};
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
