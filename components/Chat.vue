<template>
  <div id="chat-window" class="d-flex flex-column justify-space-around pa-2">
    <!-- Video Search -->
    <div class="d-flex flex-row justify-space-between align-center">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon tile v-bind="attrs" v-on="on" @click="toggleChat">
            <v-icon>mdi-arrow-collapse-right</v-icon>
          </v-btn>
        </template>
        <span>Collapse</span>
      </v-tooltip>
      <div v-if="showUsers">Floobers</div>
      <div v-else>Chat</div>
      <div v-if="showUsers">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon tile v-bind="attrs" v-on="on" @click="showUsers = !showUsers">
              <v-icon>mdi-message</v-icon>
            </v-btn>
          </template>
          <span>Chat</span>
        </v-tooltip>
      </div>
      <div v-else>
        <v-badge bordered overlap color="royal_flue" :content="users.length">
          <v-tooltip bottom>
            <template v-slot:activator="{on, attrs}">
              <v-btn icon tile v-bind="attrs" v-on="on" @click="showUsers = !showUsers">
                <v-icon>mdi-account-group</v-icon>
              </v-btn>
            </template>
            <span>Floobers</span>
          </v-tooltip>
        </v-badge>
      </div>
    </div>
    <div class="chat-toolbar pa-1">
      <a href="https://forms.gle/Ye2Zk8wZLkf9F7zD8" target="_blank" rel="noreferrer">Feedback</a>
    </div>
    <div id="message-window" class="flex-grow-1 py-3">
      <Users v-if="showUsers" />
      <div v-else>
        <div class="font-weight-thin" style="color: #9e9e9e">Welcome To Chat!</div>
        <div v-for="message in messages" :key="message.id">
          <div v-if="message.eventMessage">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  v-on="on"
                  style="color: #9e9e9e"
                >{{message.username}} {{message.message}}</span>
              </template>
              <span>{{ message.timestamp | moment("hh:mm a") }}</span>
            </v-tooltip>
          </div>
          <div v-else>
            <span class="message" :style="'color:' + message.color">{{ message.username }}</span>:
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on" v-html="message.message"></span>
              </template>
              <span>{{ message.timestamp | moment("hh:mm a") }}</span>
            </v-tooltip>
          </div>
        </div>
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
import Users from "@/components/Users";
export default {
  name: "Chat",
  components: {
    Users,
  },
  data() {
    return {
      message: "",
      messages: [],
      hideChat: false,
      showUsers: false,
    };
  },
  sockets: {
    newMessage: function (message) {
      let messages = document.querySelector("#message-window");
      // Prior to getting your messages.
      this.messages.push(message);
      // After getting your messages.
      setTimeout(function () {
        messages.scrollTop = messages.scrollHeight;
      }, 50);
    },
  },
  mounted() {
    // Register an event listener when the Vue component is ready
    window.addEventListener("resize", this.resizeChat);
    this.resizeChat();
  },
  methods: {
    ...mapActions({
      notificationAdd: "notification/add",
      toggleLoginModal: "modal/toggleLoginModal",
    }),
    sendMessage() {
      //Prompt user to login if chatting
      if (!this.$auth.loggedIn) {
        this.toggleLoginModal();
        this.notificationAdd({
          type: "info",
          message: "Please Login To Chat",
        });
        return;
      }

      if (this.message.length > 256) {
        this.notificationAdd({
          type: "error",
          message: "Message too long",
        });
        return;
      }

      if (this.message && this.$auth.loggedIn) {
        let newMessage = {
          message: this.message,
          roomID: this.room.id,
          user: this.$auth.user,
        };
        this.$socket.emit("sendMessage", newMessage);
        this.message = "";
      }
    },
    resizeChat() {
      // if (process.browser) {
      //   let videoHeight = document.querySelector("#video-size");
      //   let chatWindow = document.querySelector("#chat-window");
      //   if (videoHeight) {
      //     let newHeight = videoHeight.offsetHeight - 15 + "px";
      //     chatWindow.style.height = newHeight;
      //   }
      // }
    },
    toggleChat() {
      this.$emit("toggleChat");
    },
  },
  computed: {
    ...mapState({
      room: (state) => state.room.room,
      users: (state) => state.room.users,
    }),
  },
  beforeDestroy() {
    // Unregister the event listener before destroying this Vue instance
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
#chat-window {
  background: #1e142d;
  border-radius: 8px;
  height: 750px;
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

.chat-toolbar {
  display: flex;
  justify-content: center;
}

.chat-toolbar > a:first-child {
  justify-self: end;
}

.chat-toolbar div {
  justify-self: center;
}
@media only screen and (max-width: 1904px) {
  #chat-window {
    height: 615px;
  }
}
@media only screen and (max-width: 1260px) {
  #chat-window {
    height: 497px;
  }
}
</style>
