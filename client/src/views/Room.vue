<template>
  <v-container fluid class="h100">
    <v-row class="h100">
      <!-- Main Layout -->
      <v-col :class="videoSize">
        <div class="d-flex flex-column h100">
          <!-- Video Search -->
          <div class="ma-2 pl-4">
            <v-row no-gutters style="flex-wrap: nowrap;">
              <v-col align-self="center" v-if="roomInfo">
                {{ roomInfo.name }}
              </v-col>
              <!-- <v-col
                style="min-width: 100px; max-width: 100%;"
                class="flex-grow-1 flex-shrink-0"
              >
                <VideoSearch></VideoSearch>
              </v-col> -->
              <v-spacer></v-spacer>
              <v-col align-self="center" class="text-right">
                <v-btn outlined @click="voteToSkip">Vote To Skip(0)</v-btn>
                <v-btn icon tile v-if="hideChat" @click="toggleChat">
                  <v-icon>mdi-arrow-collapse-left</v-icon>
                </v-btn>
              </v-col>
              <!-- <v-col
                cols="1"
                class="flex-grow-0 flex-shrink-1 align-self-center text-center"
                v-if="roomOwner"
              >
                <v-btn icon v-if="roomOwner" @click="toggleRoomSettings">
                  <v-icon>mdi-settings</v-icon>
                </v-btn>
              </v-col> -->
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
                <span class="subheading">
                  {{userCount}}
                </span>
                <!-- <v-tooltip left>
                  <template v-slot:activator="{ on }">
                    <span
                      @click="hideChat = !hideChat"
                      v-on="on"
                      class="pointer"
                    >
                      <v-icon v-if="hideChat">mdi-chevron-left</v-icon>
                      <v-icon v-else>mdi-chevron-right</v-icon>
                    </span>
                  </template>
                  <span>{{ chatTooltip }}</span>
                </v-tooltip> -->
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
      <v-col :class="chatSize">
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
import videoQueue from '@/components/VideoQueue'
import VideoSearch from '@/components/VideoSearch'
import VideoPlayer from '@/components/VideoPlayer'
import PublicRoomDialog from '@/components/Dialogs/Public-Room-Dialog'
import RoomSettingsDialog from '@/components/Dialogs/Room-Settings-Dialog'
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
        user: this.$store.state.user.id
      }
      if (payload.video) {
        this.$socket.emit('voteToSkip', payload)
      }
    },
    createdRoom() {
      let createdRoom = this.$route.params.createdRoom
      if (createdRoom) {
        this.showCreatedRoom = true
      }
    }
  },
  beforeDestroy() {
    let payload = {
      roomID: this.roomInfo.id,
      user: this.$store.state.user
    }
    this.$socket.emit('removeFromRoom', payload)
  },
  computed: {
    videoSize: function() {
      if (this.hideChat) {
        return 'col-12 pa-0'
      } else {
        return 'col-12 col-md-10 pa-0'
      }
    },
    chatSize: function() {
      if (this.hideChat) {
        return 'd-none pa-0'
      } else {
        return 'col-lg-2 pa-0'
      }
    },
    chatTooltip() {
      if (this.hideChat) {
        return 'Show Chat'
      } else {
        return 'Hide Chat'
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
  }
}
</script>

<style scoped>
.h100 {
  height: 100%;
}
</style>
