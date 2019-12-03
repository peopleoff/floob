<template>
  <div>
    <v-card class="roomCard grow elevation-5" :to="'room/' + room.id">
      <v-img class="white--text align-end" aspect-ratio="1.7778" :src="roomThumbnail">
      </v-img>
      <!-- <v-card-title class="pb-0">{{ room.name }}</v-card-title>
    <v-card-text class="text--primary">
      <div>{{ room.description }}</div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-icon class="mr-1">mdi-play</v-icon>
      <span class="subheading">{{ room.videos.length }}</span>
    </v-card-actions> -->
    </v-card>
    <div class="font-weight-bold ellipsis">
      {{room.name}}
    </div>
    <div class="ellipsis" v-if="room.videos.length > 0">
      Playing: {{room.videos[0].title}}
    </div>
  </div>
  <!-- <v-card
    class="mx-auto room-card"
    color="primary"
    hover
    shaped
    :id="room.id"
    :to="'room/' + room.id"
  >
    <v-card-text>
      <p class="display-1 font-weight-black">{{ room.name }}</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-icon class="mr-1">mdi-account</v-icon>
      <span class="subheading">{{ room.current_viewers.length }}</span>
    </v-card-actions>
  </v-card> -->
</template>

<script>
import _ from 'lodash'
import RoomService from '@/services/RoomService.js'
import VideoService from '@/services/VideoService.js'
import { mapMutations } from 'vuex'

export default {
  name: 'Room',
  props: ['room'],
  data() {
    return {
      dialog: false,
      selectedRoom: null,
      password: null,
      loading: false
    }
  },
  methods: {
    ...mapMutations(['UPDATE_SNACKBAR']),
    enterRoom(room) {
      if (room.password) {
        this.selectedRoom = room
        this.dialog = true
      } else {
        this.$router.push({
          path: '/room/' + room._id
        })
      }
    },
    toggleRoom: _.debounce(function(roomID) {
      if (!this.loggedIn) {
        this.UPDATE_SNACKBAR({
          type: 'info',
          message: 'Please Login First!'
        })
        return
      }
      let room = {
        user: this.$store.state.user.id,
        room: roomID
      }
      RoomService.toggleRoom(room)
        .then(result => {
          this.UPDATE_SNACKBAR(result.data)
          this.$emit('toggledRoom', 'carrier')
        })
        .catch(error => {
          console.error(error)
        })
    }, 500),
    removeThumbnail(room) {
      let card = document.getElementById(room._id)
      card.style.backgroundImage = ''
    },
    getThumbnail(room) {
      let card = document.getElementById(room._id)
      VideoService.getThumbnail({ roomID: room._id }).then(result => {
        card.style.backgroundImage = 'url(' + result.data.image + ')'
      })
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    roomThumbnail() {
      if (this.room.videos.length > 0) {
        return this.room.videos[0].image
      } else {
        return require('@/assets/images/thumbnail.gif')
      }
    }
  }
}
</script>

<style scoped>
.grow {
  transition: all 0.2s ease-in-out;
}
.grow:hover {
  transform: scale(1.05);
}
.roomCard:hover .join-btn {
  display: flex;
}

.join-btn {
  display: none;
  position: absolute;
  bottom: 5%;
  right: 5%;
}
.ellipsis{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
/* .room-card {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.room-description {
  height: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v-card__actions {
  position: absolute;
  bottom: 0;
  width: 100%;
} */
</style>
