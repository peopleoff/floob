<template>
  <v-container fluid>
    <section>
      <v-row align="start" justify="center">
        <v-col class="text-center" cols="12">
          <v-img
            :src="require('@/assets/images/logo-text.svg')"
            height="100%"
            width="30%"
            style="margin: 0 auto"
          ></v-img>
          <h4 class="subheading">
            Floob gives gamers a place to chill while sharing videos that
            everyone can watch at the same time. Our mission is to provide
            people a place to share their favorite content with the communities
            they love and to connect with communities not yet explored.
          </h4>
          <v-btn class="ma-2" color="secondary" to="/Login">
            Log In
          </v-btn>
          <v-btn class="ma-2" outlined to="/rooms">
            Discover Rooms
          </v-btn>
        </v-col>
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
  }
}
</script>

<style scoped>
.container {
  padding: 0;
}
.container{
  height: 100%;
}
.subheading{
  width: 50%;
  margin: 0 auto;
}
section {
    height: 100%;
    background: url('https://media.discordapp.net/attachments/631129642362994698/643913660133277736/FloobFADEsmall.png');
    background-position: inherit;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 15%;
}
</style>
