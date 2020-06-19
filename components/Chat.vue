<template>
  <div id="chat-window" class="d-flex flex-column justify-space-around">
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
    <div id="message-window" class="flex-grow-1">
      <div class="font-weight-thin" style="color: #9e9e9e">Welcome To Chat!</div>
      <div v-for="message in messages" :key="message.id">
        <span class="primary--text message">{{ message.username }}</span>
        <span>: {{ message.message }}</span>
      </div>
    </div>
    <div>
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
import { mapActions } from "vuex";
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
    ...mapActions({
      notificationAdd: "notification/add",
      toggleForm: "user/toggleForm"
    }),
    sendMessage() {
      //Prompt user to login if chatting
      if (!this.$auth.loggedIn) {
        this.toggleForm();
        this.notificationAdd({
          type: "info",
          message: "Please Login To Chat"
        });
        return;
      }

      if (this.message.length > 256) {
        this.notificationAdd({
          type: "error",
          message: "Message too long"
        });
        return;
      }

      if (this.message && this.$auth.loggedIn) {
        let newMessage = {
          message: this.message,
          roomID: this.$route.params.id,
          user: this.$auth.user
        };
        this.$socket.emit("sendMessage", newMessage);
        this.message = "";
        let container = document.querySelector("#message-window");
        container.scrollTop = container.scrollHeight;
      }
    },
    toggleChat() {
      this.$emit("toggleChat");
    }
  }
};
</script>

<style scoped>
#chat-window {
  height: 90vh;
}
#message-window {
  overflow-y: scroll;
}
/* Hide scrollbar for Chrome, Safari and Opera */
#message-window::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
