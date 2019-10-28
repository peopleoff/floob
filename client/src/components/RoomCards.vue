<template>
  <v-card
    class="mx-auto room-card"
    color="primary"
    hover
    shaped
    :id="room.id"
    :to="'room/' + room.id"
  >
    <v-card-text>
      <p class="display-1 font-weight-black">
        {{ room.name }}
      </p>
      <p class="black--text">{{ room.description }}</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon v-on:click.prevent="toggleRoom(room.id)" color="secondary">
        <v-icon v-if="room.favoriteRoom">mdi-heart</v-icon>
        <v-icon v-else>mdi-heart-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
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
        console.log(result.data)
        card.style.backgroundImage = 'url(' + result.data.image + ')'
      })
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style scoped>
.room-card {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
