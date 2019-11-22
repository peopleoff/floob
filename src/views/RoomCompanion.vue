<template>
    <div class="d-flex flex-column h100">
        <div class="flex-grow-0 text-center" v-if="room">
            <h1>{{room.name}}</h1>
        </div>
        <div class="flex-grow-1">
            <Chat />
        </div>
        <div class="flex-grow-0">
            <videoQueue :videoQueue="videoQueue" />
        </div>

    </div>
  <!-- <v-container fluid class="h100">
    <v-row v-if="room">
      <v-col class="text-center">
        <h1>{{ room.name }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Chat />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        
      </v-col>
    </v-row>
  </v-container> -->
</template>

<script>
import RoomService from '@/services/RoomService'
import VideoSearch from '@/components/VideoSearch'
import videoQueue from '@/components/VideoQueue'
import Chat from '@/components/Chat'

import { mapMutations } from 'vuex'

export default {
  name: 'RoomCompanion',
  components: {
    VideoSearch,
    videoQueue,
    Chat
  },
  data() {
    return {
      room: null,
      videoQueue: []
    }
  },
  sockets: {
    getVideos: function(payload) {
      this.videoQueue = payload
    }
  },
  mounted() {
    this.newRoom()
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
          console.log(result)
          this.room = result.data.room
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
    }
  }
}
</script>

<style scoped>
.h100 {
  height: 100%;
}
</style>
