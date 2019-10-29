<template>
  <v-container fluid class="h100">
    <v-row class="h100">
      <!-- Main Layout -->
      <!-- <v-col class="col-12 col-sm-6 col-md-4 col-lg-9 pa-0"> -->
      <v-col :class="videoSize">
        <div class="d-flex flex-column h100">
          <!-- Video Search -->
          <div class="ma-2">
            <v-row no-gutters style="flex-wrap: nowrap;">
              <v-col
                cols="2"
                class="flex-grow-0 flex-shrink-0 align-self-center text-left"
                v-if="roomInfo"
              >
                <div class="subtitle-1">Room</div>
                <div class="caption font-weight-thin">{{ roomInfo.name }}</div>
              </v-col>
              <v-col style="min-width: 100px; max-width: 100%;" class="flex-grow-1 flex-shrink-0">
                <VideoSearch></VideoSearch>
              </v-col>
              <v-col
                cols="1"
                class="flex-grow-0 flex-shrink-1 align-self-center text-center"
                v-if="roomOwner"
              >
                <v-btn icon v-if="roomOwner" @click="toggleRoomSettings">
                  <v-icon>mdi-settings</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <!-- Video Player -->
          <div class="ma-2 flex-grow-1">
            <VideoPlayer :videoQueue="videoQueue" />
          </div>
          <!-- Video Actions -->
          <div class="ma-2">
            <div style="width: 100%;" class="d-flex justify-space-between">
              <span>Video Que</span>
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <span @click="hideChat = !hideChat" v-on="on" class="pointer">
                    <v-icon v-if="hideChat">mdi-chevron-left</v-icon>
                    <v-icon v-else>mdi-chevron-right</v-icon>
                  </span>
                </template>
                <span>{{ chatTooltip }}</span>
              </v-tooltip>
            </div>
          </div>
          <!-- Video Que -->
          <div class="ma-2" style="min-height: 5rem;">
            <videoQueue v-if="videoQueue.length > 0" :videoQueue="videoQueue" />
          </div>
        </div>
      </v-col>
      <!-- sidebar Layout -->
      <v-col :class="chatSize">
        <v-row class="mx-0 h100 w100">
          <Chat />
        </v-row>
      </v-col>
    </v-row>
    <PublicRoomDialog v-if="this.$route.params.createdRoom" />
    <RoomSettingsDialog :dialog="roomSettings" :room="roomInfo" @close="toggleRoomSettings" />
  </v-container>
</template>

<script>
import videoQueue from "@/components/VideoQueue";
import VideoSearch from "@/components/VideoSearch";
import VideoPlayer from "@/components/VideoPlayer";
import PublicRoomDialog from "@/components/Dialogs/Public-Room-Dialog";
import RoomSettingsDialog from "@/components/Dialogs/Room-Settings-Dialog";
import Chat from "@/components/Chat";
import RoomService from "@/services/RoomService";

import { mapMutations } from "vuex";

export default {
  name: "Room",
  components: {
    videoQueue,
    VideoSearch,
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
      showCreatedRoom: false
    };
  },
  mounted() {
    this.newRoom();
    this.createdRoom();
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
    newRoom() {
      let payload = {
        roomID: this.$route.params.id,
        username: this.$store.state.user
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
    toggleRoomSettings() {
      this.roomSettings = !this.roomSettings;
    },
    voteToSkip() {
      let payload = {
        roomID: this.$route.params.id,
        video: this.videoQueue[0],
        username: this.$store.state.user
      };
      if (payload.video) {
        this.$socket.emit("voteToSkip", payload);
      }
    },
    createdRoom() {
      let createdRoom = this.$route.params.createdRoom;
      if (createdRoom) {
        this.showCreatedRoom = true;
      }
    }
  },
  computed: {
    videoSize: function() {
      if (this.hideChat) {
        return "col-12 pa-0";
      } else {
        return "col-12 col-md-9 pa-0";
      }
    },
    chatSize: function() {
      if (this.hideChat) {
        return "d-none pa-0";
      } else {
        return "col-lg-3 pa-0";
      }
    },
    chatTooltip() {
      if (this.hideChat) {
        return "Show Chat";
      } else {
        return "Hide Chat";
      }
    },
    loggedIn() {
      this.$store.getters.loggedIn;
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
  }
};
</script>

<style scoped>
.h100 {
  height: 100%;
}
</style>
