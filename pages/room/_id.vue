<template>
  <section class="h100 grid-container">
    <div class="player">
      <v-app-bar absolute class="search-bar">
        <v-spacer></v-spacer>
        <v-text-field
          name="videoSearch"
          hint="Hint: BlackMesaScientist"
          type="text"
          filled
          outlined
          hide-details
          width="50%"
        ></v-text-field>
        <v-spacer></v-spacer>
      </v-app-bar>
      <div class="d-flex flex-column h100">
        <!-- Video Player -->
        <div style="padding-top: 50px;">
          <VideoPlayer :videoQueue="videoQueue" />
        </div>
        <!-- Video Actions -->
        <div class="d-flex justify-space-between align-center pa-5">
          <div class="roomName">
            <div class="title">
              The LUCKIEST Jump I've Ever Had in Versus Mode (Super Mario Maker
              2 Multiplayer)
            </div>
            <div class="subtitle-1"><v-icon>mdi-youtube</v-icon> raysfire</div>
          </div>
          <div>
            <v-btn>Vote To Skip</v-btn>
          </div>
        </div>
        <!-- Video Que -->
        <div class="px-5">
          <videoQueue :videoQueue="videoQueue" />
        </div>
      </div>
    </div>
    <div id="sidebar">
      <Chat @toggleChat="toggleChat" />
    </div>
    <PublicRoomDialog v-if="this.$route.params.createdRoom" />
    <RoomSettingsDialog
      :dialog="roomSettings"
      :room="roomInfo"
      @close="toggleRoomSettings"
    />
  </section>
</template>

<script>
const PublicRoomDialog = () =>
  import("@/components/Dialogs/Public-Room-Dialog");
const RoomSettingsDialog = () =>
  import("@/components/Dialogs/Room-Settings-Dialog");
import videoQueue from "@/components/VideoQueue";
import videoSearch from "@/components/videoSearch";
import VideoPlayer from "@/components/VideoPlayer";
import Chat from "@/components/Chat";
import RoomService from "@/services/RoomService";

import { mapMutations } from "vuex";

export default {
  name: "Room",
  layout: "app",
  components: {
    videoQueue,
    videoSearch,
    VideoPlayer,
    PublicRoomDialog,
    RoomSettingsDialog,
    Chat
  },
  data() {
    return {
      tab: null,
      roomSettings: false,
      roomInfo: null,
      tabs: 2,
      videoQueue: [],
      hideChat: false,
      showCreatedRoom: false,
      skipCounter: 0,
      userCount: 0
    };
  },
  mounted() {
    // this.newRoom()
    // this.createdRoom()
  },
  sockets: {
    getVideos: function(payload) {
      this.videoQueue = payload;
    },
    userCount: function(payload) {
      this.userCount = payload;
    },
    skipCounter: function(payload) {
      this.skipCounter = payload;
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
    ...mapMutations(["UPDATE_SNACKBAR"]),
    newRoom() {
      let payload = {
        roomID: this.$route.params.id,
        user: this.$store.state.user
      };
      this.$socket.emit("newRoom", payload);
      RoomService.getInfo({
        id: this.$route.params.id,
        user: this.$store.state.user
      })
        .then(result => {
          this.roomInfo = result.data.room;
        })
        .catch(error => {
          console.error(error);
        });
    },
    toggleChat() {
      this.hideChat = !this.hideChat;
    },
    toggleRoomSettings() {
      this.roomSettings = !this.roomSettings;
    },
    voteToSkip() {
      if (!this.loggedIn) {
        this.UPDATE_SNACKBAR({
          type: "info",
          message: "Please Login first",
          x: "right",
          y: "top"
        });
        return;
      }
      let payload = {
        roomID: this.$route.params.id,
        video: this.videoQueue[0],
        user: this.$store.state.user.id,
        roomOwner: this.roomOwner
      };
      if (payload.video) {
        this.$socket.emit("voteToSkip", payload);
      }
    },
    createdRoom() {
      let createdRoom = this.$route.params.createdRoom;
      if (createdRoom) {
        this.showCreatedRoom = true;
        this.roomSettings = true;
      }
    }
  },
  computed: {
    skipText() {
      if (this.$store.state.user && this.videoQueue.length > 0) {
        if (
          this.$store.state.user.id == this.videoQueue[0].user ||
          this.roomOwner
        ) {
          return "Skip Video";
        }
      }
      if (this.videoQueue.length > 0) {
        return `Vote to skip`;
      }
    },
    chatSize: function() {
      if (this.hideChat) {
        return "d-none pa-0";
      } else {
        return "col-lg-2 pa-0";
      }
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    roomOwner() {
      if (!this.roomInfo) {
        return false;
      }
      if (this.$store.getters.loggedIn && this.roomInfo.roomOwner) {
        return true;
      } else {
        return false;
      }
    }
  },
  beforeDestroy() {
    let payload = {
      roomID: this.roomInfo.id,
      user: this.$store.state.user
    };
    this.$socket.emit("removeFromRoom", payload);
  }
};
</script>

<style scoped>
.h100 {
  height: 100%;
}

.player{
  position: relative;
}

.grid-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

#sidebar {
  background-color: #363636;
}

@media only screen and (max-width: 959px) {
  .v-application .title {
    font-size: 0.75rem !important;
  }
  .v-application .subtitle-1 {
    font-size: 0.5rem !important;
  }
  .v-application .pl-4 {
    padding-left: 0 !important;
  }
  #sidebar {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
}
</style>
