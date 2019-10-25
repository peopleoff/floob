<template>
  <v-container fluid>
    <section v-if="favoriteRooms.length > 0">
      <h1>My Rooms</h1>
      <h3>View the most engaged public rooms.</h3>
      <v-row>
        <v-col
          v-for="room in favoriteRooms"
          :key="room.id"
          sm="6"
          md="4"
          lg="3"
        >
          <v-skeleton-loader
            type="card"
            :loading="loading"
            transition="fade-transition"
          >
            <RoomCard :room="room" @toggledRoom="getRooms" />
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </section>
    <section>
      <h1>Rooms</h1>
      <h3>View the most engaged public rooms.</h3>
      <v-row>
        <v-col v-for="room in publicRooms" :key="room.id" sm="6" md="4" lg="3">
          <RoomCard :room="room" @toggledRoom="getRooms" />
        </v-col>
        <v-col
          v-for="(skeleton, index) in 25"
          :key="index"
          sm="6"
          md="4"
          lg="3"
        >
          <v-skeleton-loader
            type="card"
            :loading="loading"
            transition="fade-transition"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </section>
    <v-btn @click="addRooms">Test</v-btn>
  </v-container>
</template>

<script>
import RoomCard from '@/components/RoomCards'
import RoomService from '@/services/RoomService.js'

import { mapMutations } from 'vuex'

export default {
  name: 'Index',
  components: {
    RoomCard
  },
  data() {
    return {
      loading: true,
      publicRooms: [],
      favoriteRooms: []
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_LOADING']),
    getRooms() {
      let user = null
      this.loading = true
      this.publicRooms = []
      this.favoriteRooms = []
      if (this.$store.state.user) {
        user = this.$store.state.user.id
      }
      RoomService.getAll({
        user: user
      })
        .then(response => {
          this.publicRooms = response.data.publicRooms
          response.data.favoriteRooms.forEach(element => {
            let room = {
              favoriteRoom: true,
              description: element.roomInfo.description,
              id: element.roomInfo.id,
              name: element.roomInfo.name,
              nsfw: element.roomInfo.nsfw,
              roomID: element.roomInfo.roomID,
              type: element.roomInfo.type,
              vanityName: element.roomInfo.vanityName
            }
            this.favoriteRooms.push(room)
          })
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    addRooms() {
      for (let i = 0; i < 25; i++) {
        let newRoom = {
          name: 'Test Name ' + i,
          description: 'Test Description ' + i,
          nsfw: 1,
          userID: 1,
          roomType: 1
        }
        RoomService.register(newRoom)
      }
    }
  },
  mounted() {
    this.getRooms()
  }
}
</script>
