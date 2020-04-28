<template>
  <v-container fluid class="h100 pa-0">
    <v-row class="h100 ma-0">
      <v-col class="pa-0">
        <VideoSearchBar :showChat="showChat" @toggleChat="toggleChat" />
        <div class="player">
          <div class="d-flex flex-column h100">
            <!-- Video Player -->
            <div>
              <VideoPlayer :videoQueue="videoQueue" />
            </div>
            <!-- Video Actions -->
            <div class="d-flex justify-space-between align-center pa-5">
              <div class="roomName">
                <div class="title">
                  The LUCKIEST Jump I've Ever Had in Versus Mode (Super Mario Maker
                  2 Multiplayer)
                </div>
                <div class="subtitle-1">
                  <v-icon>mdi-youtube</v-icon>raysfire
                </div>
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
      </v-col>
      <v-col :class="chatSize" class="h100">
        <Chat @toggleChat="toggleChat" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import videoQueue from "@/components/VideoQueue";
import videoSearch from "@/components/videoSearch";
import VideoPlayer from "@/components/VideoPlayer";
import VideoSearchBar from "@/components/VideoSearchBar";
import Chat from "@/components/Chat";
import RoomService from "@/services/RoomService";

import { mapActions, mapState } from "vuex";

export default {
  name: "Room",
  layout: "app",
  components: {
    videoQueue,
    videoSearch,
    VideoPlayer,
    VideoSearchBar,
    Chat
  },
  data() {
    return {
      videoQueue: [],
      showChat: true
    };
  },
  sockets: {
    getVideos: function(payload) {
      this.videoQueue = payload;
    }
  },
  created() {
    this.joinedRoom();
  },
  methods: {
    ...mapActions({
      enterRoom: "room/enterRoom"
    }),
    joinedRoom() {
      let payload = {
        id: this.$route.params.id,
        user: this.user
      };
      this.enterRoom(payload)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
    },
    toggleChat() {
      this.showChat = !this.showChat;
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('room', ['room']),
    chatSize: function() {
      if (this.showChat) {
        return "col-lg-3 pa-0";
      } else {
        return "d-none pa-0";
      }
    }
  }
};
</script>

<style scoped>
</style>
