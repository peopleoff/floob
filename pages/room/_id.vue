<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <VideoSearchBar :showChat="showChat" @toggleChat="toggleChat" />
        <div class="player">
          <div class="d-flex flex-column">
            <!-- Video Player -->
            <VideoPlayer v-if="nextVideo" :video="nextVideo" @ended="ended" />
            <!-- Video Que -->
            <videoQueue :videoQueue="videoQueue" />
          </div>
        </div>
      </v-col>
      <v-col :class="chatSize">
        <Chat @toggleChat="toggleChat" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import videoQueue from "@/components/VideoQueue";
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
    VideoPlayer,
    VideoSearchBar,
    Chat
  },
  data() {
    return {
      allVideos: [],
      showChat: true
    };
  },
  sockets: {
    getVideos: function(payload) {
      this.allVideos = payload;
    }
  },
  mounted() {
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
      this.$socket.emit("joinedRoom", payload);
      this.enterRoom(payload)
        .then(result => {
          this.log(result);
          // console.log(result);
        })
        .catch(error => {
          console.error(error);
        });
    },
    ended(event) {
      console.log(event);
      this.$socket.emit("removeVideo", event);
      this.allVideos.shift();
    },
    toggleChat() {
      this.showChat = !this.showChat;
    }
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("room", ["room"]),
    chatSize: function() {
      if (this.showChat) {
        return "col-lg-3 px-0";
      } else {
        return "d-none px-0";
      }
    },
    nextVideo() {
      return this.allVideos[0];
    },
    videoQueue() {
      return this.allVideos.filter((video, index) => index != 0);
    }
  }
};
</script>

<style scoped>
</style>
