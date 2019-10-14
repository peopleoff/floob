<template>
  <div id="chatroom">
    <v-layout row wrap>
      <v-flex :class="playerSize">
        <!-- <span
          v-if="videoQueue.length > 0"
          class="videoTitle"
        >{{videoQueue[0].title}} - {{videoQueue[0].username}}</span> -->
        <player :videoQueue="videoQueue" />
      </v-flex>
      <v-flex :class="queueSize" id="videoSidebar">
        <sidebar :videoQueue="videoQueue" />
      </v-flex>
      <!-- <v-flex :class="playerSize">
        <v-btn
          class="my-2 mx-3"
          @click="voteToSkip()"
          v-if="videoQueue.length > 0"
        >Vote To Skip ({{videoQueue[0].skipCounter.length}})</v-btn>
        <v-btn
          small
          dark
          fab
          @click="theaterMode"
          id="theaterModeButton"
          class="hidden-sm-and-down"
        >
          <v-icon>{{theaterModeButtonIcon}}</v-icon>
        </v-btn>
      </v-flex> -->
    </v-layout>
  </div>
</template>

<script>
import Player from "@/components/theater/Player";
import Sidebar from "@/components/theater/Sidebar";

import { mapMutations } from "vuex";

export default {
  name: "Theater",
  components: {
    Player,
    Sidebar
  },
  data() {
    return {
      videoQueue: [],
      socketID: "",
      playerSize: "xs12 md9",
      queueSize: "md3 hidden",
      theaterModeButtonIcon: "keyboard_arrow_right",
      theaterModeButton: false
    };
  },
  mounted() {
    this.newRoom();
  },
  sockets: {
    getVideos: function(payload) {
      this.videoQueue = payload;
    },
    voteAdded: function(payload) {
      this.videoQueue.map(element => {
        if (element._id === payload._id) {
          element.skipCounter = payload.skipCounter;
        }
      });
    }
  },
  methods: {
    ...mapMutations(["TOGGLE_LOADING"]),
    newRoom() {
      let payload = {
        roomID: this.$route.params.id,
        username: this.$store.state.user
      };
      this.$socket.emit("newRoom", payload);
      this.TOGGLE_LOADING();
    },
    theaterMode() {
      this.theaterModeButton = !this.theaterModeButton;
      if (this.theaterModeButton) {
        this.theaterModeButtonIcon = "keyboard_arrow_left";
        this.playerSize = "xs12";
        this.queueSize = "d-none";
      } else {
        this.theaterModeButtonIcon = "keyboard_arrow_right";
        this.playerSize = "xs12 md9";
        this.queueSize = "md3 hidden-sm-and-down";
      }
    },
    voteToSkip() {
      let payload = {
        roomID: this.$route.params.id,
        video: this.videoQueue[0],
        username: this.$store.state.user
      };
      this.$socket.emit("voteToSkip", payload);
    }
  },
  computed: {
    sideBarState() {
      return this.$store.state.chatroomSidebar;
    }
  },
  watch: {
    sideBarState() {
      document
        .getElementById("videoSidebar")
        .classList.toggle("slide-out-right");
    }
  },
  beforeDestroy() {
    this.$socket.emit("leaveRoom", this.$socket.id);
  }
};
</script>

<style>
#theaterModeButton {
  float: right;
}

.currentInfo p {
  margin: 0;
  padding: 0;
}

.videoTitle {
  position: absolute;
  top: 0;
  padding-left: 15px;
}

@media only screen and (max-width: 959px) {
  #videoSidebar {
    -webkit-transition: width 0.3s;
    /* For Safari 3.1 to 6.0 */
    transition: width 0.3s;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
  }

  .hidden {
    width: 0;
    overflow: hidden;
  }

  .slide-out-right {
    width: 50%;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14),
      0px 9px 46px 8px rgba(0, 0, 0, 0.12) !important;
  }
}

@media only screen and (max-width: 425px) {
  .slide-out-right {
    width: 75%;
  }
}
</style>