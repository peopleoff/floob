<template>
  <div>
    <v-card
      class="mx-auto room-card"
      color="primary"
      hover
      shaped
      :id="room._id"
      @click="enterRoom(room)"
    >
      <v-card-text>
        <p class="display-1 font-weight-black">
          {{ room.name }}
        </p>
        <p class="black--text">{{ room.description }}</p>
      </v-card-text>
    </v-card>
    <v-dialog v-if="selectedRoom" v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>
          {{ this.selectedRoom.name }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            type="text"
            label="Enter Room Password"
            v-model="password"
            ref="search"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="checkRoomPassword" :loading="loading">Enter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
    checkRoomPassword() {
      if (this.password && !this.loading) {
        this.loading = true
        let payload = {
          roomID: this.selectedRoom._id,
          password: this.password
        }
        RoomService.checkRoomPassword(payload)
          .then(result => {
            this.loading = false
            if (result.data) {
              this.$router.push({
                path: '/room/' + this.roomID
              })
            } else {
              let newError = {
                error: true,
                type: 'error',
                message: 'Invalid Password'
              }
              this.UPDATE_SNACKBAR(newError)
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        let newError = {
          error: true,
          type: 'error',
          message: 'Invalid Password'
        }
        this.UPDATE_SNACKBAR(newError)
      }
    },
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
  height: 150px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
