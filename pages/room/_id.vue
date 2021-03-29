<template>
  <v-container fluid>
    <v-row>
      <v-col id="video-section">
        <VideoSearchBar :showSidebar="showSidebar" @toggleSidebar="toggleSidebar" />
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
      <v-col cols="12" md="2" :class="SidebarSize">
        <Sidebar @toggleSidebar="toggleSidebar" />
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
import videoQueue from "@/components/room/VideoQueue";
import VideoPlayer from "@/components/room/VideoPlayer";
import VideoSearchBar from "@/components/room/VideoSearchBar";
import Sidebar from "@/components/room/sidebar/Sidebar";
import RoomService from "@/services/RoomService";
import VideoService from "@/services/VideoService";

import { mapState, mapActions } from "vuex";

export default {
  name: "Room",
  components: {
    videoQueue,
    VideoPlayer,
    VideoSearchBar,
    Sidebar,
  },
  head() {
    return {
      title: "Floob - " + this.room.room_uuid,
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
      showSidebar: true,
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
    heartbeat: function(payload){
      this.updateStoreUsers(payload.users);
      this.updateStoreVideo(payload.video);
    }
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
    return VideoService.getVideos({ room_id: params.id }).then((result) => {
      return {
        allVideos: result.data,
      };
    });
  },
  mounted() {
    let payload = {
      room: this.room,
      user: this.$auth.user,
    };
    this.$socket.emit("enterRoom", payload);
  },
  methods: {
    ...mapActions({
      clearRoom: "room/clearRoom",
      notificationAdd: "notification/add",
      updateUserList: "room/updateUserList",
      updateVideo: "room/updateVideo",
    }),
    ended(event) {
      this.$socket.emit("removeVideo", event);
      this.allVideos.shift();
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    leaveRoom(){
      this.$socket.emit("leaveRoom");
      this.clearRoom();
    },
    updateStoreUsers(users){
      this.updateUserList(users);
    },
    updateStoreVideo(video){
      this.updateVideo(video);
    }
  },
  computed: {
    ...mapState({
      room: (state) => state.room.room,
    }),
    SidebarSize: function () {
      if (this.showSidebar) {
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
