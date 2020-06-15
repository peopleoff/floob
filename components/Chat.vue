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
    <div class="flex-grow-1">
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
#chat-window{
  height: 95vh;
}
</style>
