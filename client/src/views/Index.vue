<template>
  <!-- <Rooms :publicRooms=publicRooms :privateRooms=privateRooms /> -->
  <v-container fluid>
    <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
    <h1>Public Rooms</h1>
    <h3>View the most engaged public rooms.</h3>
    <v-row>
      <v-col
        v-for="room in publicRooms"
        :key="room._id"
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
    <h1>Private Rooms</h1>
    <h3>View the most engaged public rooms.</h3>
    <v-row>
      <v-col
        v-for="room in privateRooms"
        :key="room._id"
        cols="12"
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
      publicRooms: [],
      privateRooms: []
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_LOADING']),
    getRooms() {
      RoomService.getAll()
        .then(response => {
          response.data.forEach(element => {
            if (element.password) {
              this.privateRooms.push(element)
            } else {
              this.publicRooms.push(element)
            }
          })
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
