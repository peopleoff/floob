<template>
  <div id="chat-window" class="d-flex flex-column justify-space-around pa-2">
    <!-- Video Search -->
    <div class="d-flex flex-row justify-space-between align-center">
      <v-btn icon tile @click="toggleChat" class="hidden-sm-and-down">
        <v-icon>mdi-arrow-collapse-right</v-icon>
      </v-btn>
      <div>Chat</div>
      <div></div>
    </div>
    <div id="message-window" class="flex-grow-1 py-3">
      <div class="font-weight-thin" style="color: #9e9e9e">Welcome To Chat!</div>
      <div v-for="message in messages" :key="message.id">
        <span class="message" :style="'color:' + message.color">{{ message.username }}</span>:
        <span v-html="message.message"></span>
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
        color="legendary_mint"
        @click:append="sendMessage"
        @keydown.enter="sendMessage"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
      let messages = document.querySelector("#message-window");
      // Prior to getting your messages.
      this.messages.push(message);
      // After getting your messages.
      setTimeout(function() {
        messages.scrollTop = messages.scrollHeight;
      }, 50);
    }
  },
  mounted() {
    // Register an event listener when the Vue component is ready
    window.addEventListener("resize", this.resizeChat);
    this.resizeChat();
  },
  methods: {
    ...mapActions({
      notificationAdd: "notification/add",
      toggleLoginModal: "modal/toggleLoginModal"
    }),
    sendMessage() {
      //Prompt user to login if chatting
      if (!this.$auth.loggedIn) {
        this.toggleLoginModal();
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
          roomID: this.room.id,
          user: this.$auth.user
        };
        this.$socket.emit("sendMessage", newMessage);
        this.message = "";
      }
    },
    resizeChat() {
      if (process.browser) {
        let videoHeight = document.querySelector("#video-size");
        let chatWindow = document.querySelector("#chat-window");
        if (videoHeight) {
          let newHeight = videoHeight.offsetHeight + 45 + "px";
          chatWindow.style.height = newHeight;
        }
      }
    },
    toggleChat() {
      this.$emit("toggleChat");
    }
  },
  computed: {
    ...mapState({
      room: state => state.room.room
    })
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style scoped>
#chat-window {
  background: #1e142d;
  border-radius: 8px;
  height: 80vh;
}
#message-window div {
  word-break: break-word;
  padding-top: 2px;
  padding-bottom: 2px;
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
