<template>
  <div id="sidebar" class="d-flex flex-column justify-space-around">
    <div id="sidebar-header">
      <v-tabs v-model="tab" color="legendary_mint" grow>
        <v-tab>
          <v-badge bordered overlap color="royal_flue" :content="users.length">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon tile v-bind="attrs" v-on="on">
                  <v-icon>mdi-account-group</v-icon>
                </v-btn>
              </template>
              <span>Floobers</span>
            </v-tooltip>
          </v-badge>
        </v-tab>
        <v-tab>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon tile v-bind="attrs" v-on="on">
                <v-icon>mdi-message</v-icon>
              </v-btn>
            </template>
            <span>Chat</span>
          </v-tooltip>
        </v-tab>
      </v-tabs>
    </div>
    <div id="sidebar-body" class="flex-grow-1">
      <v-tabs-items v-model="tab" class="h100 pa-2">
        <v-tab-item class="h100">
          <Users />
        </v-tab-item>
        <v-tab-item class="h100">
          <Chat />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Users from "@/components/room/sidebar/Users";
import Chat from "@/components/room/sidebar/Chat";

export default {
  name: "Sidebar",
  components: {
    Users,
    Chat,
  },
  data() {
    return {
      message: "",
      messages: [],
      hideChat: false,
      showUsers: false,
      tab: 0,
    };
  },
  methods: {
    ...mapActions({
      notificationAdd: "notification/add",
      toggleLoginModal: "modal/toggleLoginModal",
    }),
    sendMessage() {
      //Prompt user to login if chatting
      if (!this.$auth.loggedIn) {
        this.toggleLoginModal({ action: "toggle" });
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
#sidebar {
  background: #1e142d;
  border-radius: 8px;
  height: 100%;
}

#sidebar-body div {
  word-break: break-word;
  padding-top: 2px;
  padding-bottom: 2px;
}

#sidebar-body {
  overflow-y: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
#sidebar-body::-webkit-scrollbar {
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
</style>
