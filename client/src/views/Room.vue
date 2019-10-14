<template>
  <v-container fluid class="h100">
    <v-row class="h100">
      <!-- Main Layout -->
      <!-- <v-col class="col-12 col-sm-6 col-md-4 col-lg-9 pa-0"> -->
      <v-col :class="videoSize">
        <div class="d-flex flex-column h100">
          <!-- Video Search -->
          <div class="ma-2">
            <VideoSearch></VideoSearch>
          </div>
          <!-- Video Player -->
          <div class="ma-2 flex-grow-1">
            <VideoPlayer :videoQueue="VideoQue" />
          </div>
          <!-- Video Actions -->
          <div class="ma-2">
            <div style="width: 100%;" class="d-flex justify-space-between">
              <span style="cursor: pointer;" @click="voteToSkip()">
                <span style="text-decoration: underline">Vote To Skip</span>
                (0)
              </span>
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
          <div class="ma-2">
            <VideoQue :videoQue="VideoQue" />
          </div>
        </div>
      </v-col>
      <!-- sidebar Layout -->
      <v-col :class="chatSize">
        <v-row class="mx-0 h100">
          <Chat />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoQue from '@/components/VideoQue'
import VideoSearch from '@/components/VideoSearch'
import VideoPlayer from '@/components/VideoPlayer'
import Chat from '@/components/Chat'

import { mapMutations } from 'vuex'

export default {
  name: 'Room',
  components: {
    VideoQue,
    VideoSearch,
    VideoPlayer,
    Chat
  },
  data() {
    return {
      tab: null,
      tabs: 2,
      VideoQue: [
        {
          _id: { $oid: '5d80ec67c06b571ce7fbab1e' },
          skipCounter: [],
          videoID: 'G55kLhv2d_4',
          roomID: '5c560a64f0b68a2d6c02bfb8',
          title: "How Micro Drill Bits Are Made | How It's Made",
          channel: 'Science Channel',
          image: 'https://i.ytimg.com/vi/G55kLhv2d_4/default.jpg',
          date: { $date: { $numberLong: '1568730215628' } },
          __v: { $numberInt: '0' }
        }
      ],
      hideChat: false
    }
  },
  mounted() {
    this.newRoom()
  },
  sockets: {
    getVideos: function(payload) {
      this.videoQueue = payload
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
    ...mapMutations(['TOGGLE_LOADING']),
    newRoom() {
      let payload = {
        roomID: this.$route.params.id,
        username: this.$store.state.user
      }
      this.$socket.emit('newRoom', payload)
      this.TOGGLE_LOADING()
    },
    voteToSkip() {}
  },
  computed: {
    videoSize: function() {
      if (this.hideChat) {
        return 'col-12 pa-0'
      } else {
        return 'col-12 col-md-9 pa-0'
      }
    },
    chatSize: function() {
      if (this.hideChat) {
        return 'd-none pa-0'
      } else {
        return 'col-lg-3 pa-0'
      }
    },
    chatTooltip() {
      if (this.hideChat) {
        return 'Show Chat'
      } else {
        return 'Hide Chat'
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
