<template>
  <v-container>
    <v-row>
      <v-col id="video-section">
        <VideoSearchBar :showChat="showChat" @toggleChat="toggleChat" />
        <VideoPlayer
          v-if="nextVideo"
          :video="nextVideo"
          :key="nextVideo.id"
          @ended="ended"
        />
        <v-sheet v-else max-height="750" id="video-size">
          <object
            type="image/svg+xml"
            :data="require('~/assets/images/likethisornah.svg')"
          >
            <img :src="require('~/assets/images/likethisornah.svg')" />
          </object>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="3" :class="chatSize">
        <Chat @toggleChat="toggleChat" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <videoQueue :videoQueue="videoQueue" />
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

import { mapState, mapActions } from "vuex";

export default {
  name: "Room",
  components: {
    videoQueue,
    VideoPlayer,
    VideoSearchBar,
    Chat,
  },
  head() {
    return {
      title: "Floob - " + this.room.roomUUID,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "My custom description",
        },
      ],
    };
  },
  data() {
    return {
      allVideos: [],
      showChat: true,
    };
  },
  sockets: {
    getVideos: function (payload) {
      this.allVideos = payload;
    },
    userJoined: function (payload) {
      this.notificationAdd({
        type: "info",
        message: payload.username + " joined the floob",
      });
    },
    userDisconnect: function (payload) {
      this.notificationAdd({
        type: "info",
        message: payload.username + " left the floob",
      });
    },
    updateUserList: function (payload) {
      this.updateUserList(payload);
    },
  },
  async fetch({ error, params, store, redirect }) {
    try {
      let room = await store.dispatch("room/enterRoom", params.id);
      if (!room) {
        redirect("/404");
      }
    } catch (e) {
      error({
        statusCode: 503,
        message: e,
      });
    }
  },
  asyncData({ error, params, store }) {
    return VideoService.getVideos({ roomID: params.id }).then((result) => {
      return {
        allVideos: result.data,
      };
    });
  },
  mounted() {
    let payload = {
      id: this.room.id,
      user: this.$auth.user,
    };
    this.$socket.emit("enterRoom", payload);
  },
  methods: {
    ...mapActions({
      clearRoom: "room/clearRoom",
      notificationAdd: "notification/add",
      updateUserList: "room/updateUserList",
    }),
    ended(event) {
      this.$socket.emit("removeVideo", event);
      this.allVideos.shift();
    },
    toggleChat() {
      this.showChat = !this.showChat;
    },
    leaveRoom(){
      this.$socket.emit("leaveRoom");
      this.clearRoom();
    }
  },
  computed: {
    ...mapState({
      room: (state) => state.room.room,
    }),
    chatSize: function () {
      if (this.showChat) {
        return "pl-md-0";
      } else {
        return "d-none pl-md-0";
      }
    },
    nextVideo() {
      return this.allVideos[0];
    },
    videoQueue() {
      return this.allVideos.filter((video, index) => index != 0);
    },
  },
  destroyed() {
    this.leaveRoom();
  },
};
</script>

<style scoped>
.container {
  min-height: 93vh;
}
</style>
