<template>
  <div>
    <v-flex>
        <v-layout v-for="message in messages" :key="message.id">
            <v-flex>{{message.username}}: {{message.message}}</v-flex>
        </v-layout>
    </v-flex>
    <v-flex>
        <form v-on:submit.prevent="addMessage()">
        <v-text-field label="Message" append-icon="chat" @click:append="addMessage" v-model="message"></v-text-field>
        </form>
    </v-flex>
  </div>
</template>

<script>
export default {
  name: "Chat",
  data() {
    return {
      messages: [],
      message: ""
    };
  },
  sockets: {
    newMessage: function(payload) {
      this.messages.push(payload);
    }
  },
  methods: {
    addMessage() {
      if (this.message) {
        let newMessage = {
          message: this.message,
          roomID: this.$route.params.id,
          user: this.$store.state.user.user
        };
        this.$socket.emit("addMessage", newMessage);
        this.message = "";
      }
    },
    popup() {
      window.open(
        `/chat/${this.$route.params.id}`,
        "popUpWindow",
        "height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes"
      );
    }
  }
};
</script>

<style scoped>
#videoQueue {
  overflow: auto;
  max-height: 70%;
}

.pressed {
  border-bottom: 1px solid white;
}

.queueTitle {
  cursor: pointer;
}

.queueTitle button {
  width: 50%;
  margin: 0;
}

#queueList {
  flex-grow: 3500;
  overflow-y: scroll;
}

.sideBar div {
  width: 100%;
}

.active {
  background: green;
}

.word-break-all {
  word-break: break-all;
}

.videoQueue {
  height: 80vh;
}

.height-0 {
  height: 0%;
}

.height-5 {
  height: 5%;
}

.height-10 {
  height: 10%;
}

.height-15 {
  height: 15%;
}

.height-20 {
  height: 20%;
}

.height-60 {
  height: 60%;
}

.height-80 {
  height: 80%;
}

@media only screen and (max-width: 959px) {
  .videoQueue {
    height: 100%;
    transition: 0ms;
    margin: 0 !important;
  }
}
</style>