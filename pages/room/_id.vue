<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="9">
        <VideoSearchBar :showChat="showChat" @toggleChat="toggleChat" />
        <div class="player">
          <div>
            <span class="body-1">Room: {{room.name}}</span>
          </div>
          <div class="d-flex flex-column">
            <!-- Video Player -->
            <VideoPlayer v-if="nextVideo" :video="nextVideo" :key="nextVideo.id" @ended="ended" />
            <v-sheet v-else height="500px"></v-sheet>
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
import VideoService from "@/services/VideoService";

import { mapState } from "vuex";

export default {
  name: "Room",
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
      console.log(payload);
      this.allVideos = payload;
    }
  },
  async fetch({ error, params, store }) {
    try {
      await store.dispatch("room/enterRoom", params.id);
    } catch (e) {
      error({
        statusCode: 503,
        message: e
      });
    }
  },
  asyncData({ error, params, store }) {
    return VideoService.getVideos({ roomID: params.id }).then(result => {
      return {
        allVideos: result.data
      };
    });
  },
  mounted() {
    let payload = {
      id: this.$route.params.id,
      user: this.$auth.user
    };
    this.$socket.emit("enterRoom", payload);
  },
  methods: {
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
    ...mapState({
      room: state => state.room.room,
      user: state => state.user.user
    }),
    chatSize: function() {
      if (this.showChat) {
        return "col-sm-3 px-0";
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
