<template>
    <v-card
      class="mx-auto room-card"
      color="primary"
      hover
      :id="room.id"
      :to="'room/'+room.id"
    >
      <v-card-text>
        <p class="display-1 font-weight-black">
          {{ room.name }}
        </p>
        <p class="black--text">{{ room.description }}</p>
      </v-card-text>
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
    removeThumbnail(room) {
      let card = document.getElementById(room._id)
      card.style.backgroundImage = ''
    },
    getThumbnail(room) {
      let card = document.getElementById(room._id)
      console.log(card)
      VideoService.getThumbnail({ roomID: room._id }).then(result => {
        console.log(result.data)
        card.style.backgroundImage = 'url(' + result.data.image + ')'
      })
    }
  }
}
</script>

<style scoped>
.room-card {
  height: 15vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
