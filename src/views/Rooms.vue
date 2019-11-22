<template>
  <v-container>
    <section class="text-center py-10">
      <h1 class="mb-5">Find new communities!</h1>
      <v-text-field
        flat
        hide-details
        outlined
        prepend-inner-icon="mdi-magnify"
        label="Search Rooms"
        id="videoBar"
        v-model="search"
      ></v-text-field>
    </section>
    <section>
      <h1>Rooms</h1>
      <h3>View the most engaged public rooms.</h3>
      <v-row v-if="fileretedList.length > 0">
        <v-col v-for="room in fileretedList" :key="room.id" sm="6" md="4" lg="3">
          <RoomCard :room="room" @toggledRoom="getRooms" />
        </v-col>
        <div class="wrapper" v-if="fileretedList.length === 0">
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
        </div>
      </v-row>
    </section>
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
      search: '',
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
    },
    createRoom() {
      let newRoom = {
        name: 'Test Name 23',
        description: 'Test Description 23',
        nsfw: 1,
        userID: 1,
        roomType: 1
      }
      RoomService.register(newRoom)
        .then(result => {
          console.log(result)
          let roomID = result.data.room
          this.$router.push({
            name: 'room',
            params: { id: roomID, createdRoom: true }
          })
          // this.$router.push({
          //   path: '/room/' + result.data.room,
          //   params: { newRoom: true }
          // })
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  computed: {
    fileretedList() {
      return this.publicRooms.filter(room => {
        return room.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted() {
    this.getRooms()
  }
}
</script>
