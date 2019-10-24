<template>
  <v-container fluid>
    <h1>My Rooms</h1>
    <h3>View the most engaged public rooms.</h3>
    <v-row v-if="favoriteRooms">
      <v-col v-for="room in favoriteRooms" :key="room.id" sm="6" md="4" lg="3">
        <v-skeleton-loader
          type="card"
          :loading="loading"
          transition="fade-transition"
        >
          <RoomCard :room="room" />
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <h1>Rooms</h1>
    <h3>View the most engaged public rooms.</h3>
    <v-row>
      <v-col v-for="room in publicRooms" :key="room.id" sm="6" md="4" lg="3">
        <v-skeleton-loader
          type="card"
          :loading="loading"
          transition="fade-transition"
        >
          <RoomCard :room="room" />
        </v-skeleton-loader>
      </v-col>
    </v-row>
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
      if (this.$store.state.user) {
        user = this.$store.state.user.id
      }
      RoomService.getAll({
        user: user
      })
        .then(response => {
          this.publicRooms = response.data.publicRooms
          this.favoriteRooms = response.data.favoriteRooms
          this.loading = false
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getRooms()
  }
}
</script>
