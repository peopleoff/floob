<template>
  <!-- <Rooms :publicRooms=publicRooms :privateRooms=privateRooms /> -->
  <v-container fluid>
    <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
    <h1>Rooms</h1>
    <h3>View the most engaged public rooms.</h3>
    <v-row>
      <v-col
        v-for="room in rooms"
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
      rooms: []
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_LOADING']),
    getRooms() {
      RoomService.getAll()
        .then(response => {
          this.rooms = response.data.result;
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
