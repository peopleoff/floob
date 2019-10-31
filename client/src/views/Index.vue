<template>
  <v-container fluid>
    <section>
      <v-parallax
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
        height="200px"
      >
        <v-row align="start" justify="center">
          <v-col class="text-center" cols="12">
            <v-img :src="require('@/assets/images/logo-text.svg')" height="100%" width="30%" style="margin: 0 auto"></v-img>
            <h4 class="subheading">Use our cool shit today</h4>
            <v-btn class="ma-2" color="secondary">
              Create a Room
            </v-btn>
            <v-btn class="ma-2" outlined color="secondary" to="/rooms">
              Open Floob
            </v-btn>
          </v-col>
        </v-row>
      </v-parallax>
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
      publicRooms: [],
      favoriteRooms: []
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_LOADING']),
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
  mounted() {
    this.getRooms()
  }
}
</script>

<style scoped>
.container {
  padding: 0;
}
.container,
section,
.v-parallax {
  height: 100%;
}
</style>
