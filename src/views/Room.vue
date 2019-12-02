<template>
  <v-container fluid class="h100">
    <v-row class="h100">
      <!-- Main Layout -->
      <v-col :class="videoSize">
        <div class="d-flex flex-column h100">
          <!-- Video Search -->
          <div class="ma-2 pl-4">
            <v-row no-gutters style="flex-wrap: nowrap;">
              <v-col align-self="center" v-if="roomInfo">{{
                roomInfo.name
              }}</v-col>
              <v-spacer></v-spacer>
              <v-col align-self="center" class="text-right d-flex justify-end">
                <v-btn
                  v-if="this.videoQueue.length > 0"
                  outlined
                  @click="voteToSkip"
                  >{{ skipText }}</v-btn
                >
                <v-btn icon tile v-if="hideChat" @click="toggleChat">
                  <v-icon>mdi-arrow-collapse-left</v-icon>
                </v-btn>
                <v-btn icon tile v-if="roomOwner" @click="toggleRoomSettings">
                  <v-icon>mdi-settings</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <!-- Video Player -->
          <div class="ma-2 pl-4 flex-grow-1">
            <VideoPlayer :videoQueue="videoQueue" />
          </div>
          <!-- Video Actions -->
          <div class="ma-2 pl-4">
            <div style="width: 100%;" class="d-flex justify-space-between">
              <div class="roomName">
                <div class="title" v-if="videoQueue.length > 0">
                  {{ videoQueue[0].title }}
                </div>
              </div>
              <div>
                <v-icon class="mr-1" color="red">mdi-account</v-icon>
                <span class="subheading">{{ userCount }}</span>
              </div>
            </div>
          </div>
          <!-- Video Que -->
          <div class="ma-2 pl-4">
            <videoQueue :videoQueue="videoQueue" />
          </div>
        </div>
      </v-col>
      <!-- sidebar Layout -->
      <v-col id="sidebar" :class="chatSize">
        <v-row class="mx-0 h100 w100">
          <Chat @toggleChat="toggleChat" />
        </v-row>
      </v-col>
    </v-row>
    <PublicRoomDialog v-if="this.$route.params.createdRoom" />
    <RoomSettingsDialog
      :dialog="roomSettings"
      :room="roomInfo"
      @close="toggleRoomSettings"
    />
  </v-container>
</template>

<script>
const PublicRoomDialog = () => import('@/components/Dialogs/Public-Room-Dialog')
const RoomSettingsDialog = () =>
  import('@/components/Dialogs/Room-Settings-Dialog')
import videoQueue from '@/components/VideoQueue'
import VideoSearch from '@/components/VideoSearch'
import VideoPlayer from '@/components/VideoPlayer'
import Chat from '@/components/Chat'
import RoomService from '@/services/RoomService'

import { mapMutations } from 'vuex'

export default {
  name: 'Room',
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
      showCreatedRoom: false,
      skipCounter: 0,
      userCount: 0
    }
  },
  mounted() {
    this.newRoom()
    this.createdRoom()
  },
  sockets: {
    getVideos: function(payload) {
      this.videoQueue = payload
    },
    userCount: function(payload) {
      this.userCount = payload
    },
    skipCounter: function(payload) {
      this.skipCounter = payload
    },
    voteAdded: function(payload) {
      this.videoQueue.map(element => {
        if (element._id === payload._id) {
          element.skipCounter = payload.skipCounter
        }
      })
    }
  },
  methods: {
    ...mapMutations(['UPDATE_SNACKBAR']),
    newRoom() {
      let payload = {
        roomID: this.$route.params.id,
        user: this.$store.state.user
      }
      this.$socket.emit('newRoom', payload)
      RoomService.getInfo({
        id: this.$route.params.id,
        user: this.$store.state.user
      })
        .then(result => {
          this.roomInfo = result.data.room
        })
        .catch(error => {
          console.error(error)
        })
    },
    toggleChat() {
      this.hideChat = !this.hideChat
    },
    toggleRoomSettings() {
      this.roomSettings = !this.roomSettings
    },
    voteToSkip() {
      if (!this.loggedIn) {
        this.UPDATE_SNACKBAR({
          type: 'info',
          message: 'Please Login first',
          x: 'right',
          y: 'top'
        })
        return
      }
      let payload = {
        roomID: this.$route.params.id,
        video: this.videoQueue[0],
        user: this.$store.state.user.id,
        roomOwner: this.roomOwner
      }
      if (payload.video) {
        this.$socket.emit('voteToSkip', payload)
      }
    },
    createdRoom() {
      let createdRoom = this.$route.params.createdRoom
      if (createdRoom) {
        this.showCreatedRoom = true
        this.roomSettings = true
      }
    }
  },
  computed: {
    videoSize: function() {
      if (this.hideChat) {
        return 'col-12 pa-0'
      } else {
        return 'col-12 col-md-10 pa-0'
      }
    },
    skipText() {
      if (this.$store.state.user && this.videoQueue.length > 0) {
        if (
          this.$store.state.user.id == this.videoQueue[0].user ||
          this.roomOwner
        ) {
          return 'Skip Video'
        }
      }
      if (this.videoQueue.length > 0) {
        return `Vote to skip`
      }
    },
    chatSize: function() {
      if (this.hideChat) {
        return 'd-none pa-0'
      } else {
        return 'col-lg-2 pa-0'
      }
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    roomOwner() {
      if (!this.roomInfo) {
        return false
      }
      if (this.$store.getters.loggedIn && this.roomInfo.roomOwner) {
        return true
      } else {
        return false
      }
    }
  },
  beforeDestroy() {
    let payload = {
      roomID: this.roomInfo.id,
      user: this.$store.state.user
    }
    this.$socket.emit('removeFromRoom', payload)
  }
}
</script>

<style scoped>
.h100 {
  height: 100%;
}
@media only screen and (max-width: 959px) {
  #sidebar {
    background: #303030;
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
    height: 100%;
  }
}
</style>
