<template>
  <v-card class="mx-3 videoQueue">
    <v-container fluid fill-height grid-list-sm class="pa-2">
      <v-layout align-center justify-center column fill-height class="sideBar">
        <v-flex class="queueTitle flex-grow-1 flex-shrink-0">
          <v-layout align-center justify-space-around row class="text-xs-center">
            <v-btn flat v-on:click="showQueue()">
              <v-icon left dark>play_arrow</v-icon>Queue
            </v-btn>
            <v-btn flat v-on:click="showChat()">
              <v-icon left dark>chat</v-icon>Chat
            </v-btn>
          </v-layout>
        </v-flex>
        <v-flex class="flex-grow-1 flex-shrink-0">
          <VideoQueue v-if="queueActive" :videoQueue="videoQueue"></VideoQueue>
          <Chat v-if="chatActive"></Chat>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import Chat from "@/components/Chat";
import VideoQueue from "@/components/theater/Que";

export default {
  name: "VideoSidebar",
  props: ["videoQueue"],
  components: {
    Chat,
    VideoQueue
  },
  data() {
    return {
      videoLink: "",
      message: "",
      queueActive: true,
      chatActive: false
    };
  },
  methods: {
    addVideo() {
      if (this.videoLink) {
        let newVideo = {
          videoLink: this.videoLink,
          roomID: this.$route.params.id,
          user: this.$store.state.user
        };
        this.snackbar = true;
        this.snackbarMessage = "Video Added";
        this.$socket.emit("addVideo", newVideo);
        this.videoLink = "";
      }
    },
    addMessage() {
      if (this.message) {
        let newMessage = {
          message: this.message,
          roomID: this.$route.params.id,
          user: this.$store.state.user
        };
        this.$socket.emit("addMessage", newMessage);
        this.message = "";
      }
    },
    showChat() {
      this.chatActive = true;
      this.queueActive = false;
    },
    showQueue() {
      this.queueActive = true;
      this.chatActive = false;
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