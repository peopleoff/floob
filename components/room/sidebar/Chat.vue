<template>
  <section id="chat" class="h100 d-flex flex-column justify-space-between">
    <div id="messages">
      <div class="font-weight-thin" style="color: #9e9e9e">
        Welcome To Chat!
      </div>
      <div v-for="message in messages" :key="message.id">
        <div v-if="message.eventMessage">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" style="color: #9e9e9e"
                >{{ message.username }} {{ message.message }}</span
              >
            </template>
            <span>{{ message.timestamp | moment("hh:mm a") }}</span>
          </v-tooltip>
        </div>
        <div v-else>
          <span class="message" :style="'color:' + message.color">{{
            message.username
          }}</span
          >:
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on" v-html="message.message"></span>
            </template>
            <span>{{ message.timestamp | moment("hh:mm a") }}</span>
          </v-tooltip>
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
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Chat",
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
      let messages = document.querySelector("#messages");
      // Prior to getting your messages.
      this.messages.push(message);
      // After getting your messages.
      setTimeout(function () {
        messages.scrollTop = messages.scrollHeight;
      }, 50);
    },
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
          room_id: this.room.id,
          user: this.$auth.user,
        };
        this.$socket.emit("sendMessage", newMessage);
        this.message = "";
      }
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
};
</script>

<style scoped>
#messages{
  overflow-y: scroll;
}
/* Hide scrollbar for Chrome, Safari and Opera */
#messages::-webkit-scrollbar {
  width: 0px;
  background: transparent; /* make scrollbar transparent */
}
</style>
