<template>
  <v-app-bar class="topBar" color="purple" fixed flat>
    <router-link
      to="/rooms"
      tag="img"
      :src="require('@/assets/images/logo-text.svg')"
      class="logo pointer"
    ></router-link>
    <v-spacer></v-spacer>
    <VideoSearch v-show="isRoom"></VideoSearch>
    <v-spacer></v-spacer>
    <div v-if="loggedIn">
      <v-btn class="ma-2" color="secondary" @click="createRoom">
        Create a Room
      </v-btn>
      <v-btn class="ma-2" outlined color="secondary" @click="logOut()">
        Log Out
      </v-btn>
    </div>
    <div v-else>
      <v-btn class="ma-2" outlined color="secondary" to="/Login">Log In</v-btn>
      <v-btn class="ma-2 purple--text" color="secondary" to="/Signup">
        Sign Up
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import RoomService from '@/services/RoomService.js'
import VideoSearch from '@/components/VideoSearch'
import { mapMutations } from 'vuex'
export default {
  components: {
    VideoSearch
  },
  data() {
    return {
      mini: true,
      items: [
        { title: 'Search Rooms', icon: 'mdi-magnify' },
        { title: 'Public Rooms', icon: 'mdi-lock-open-variant' },
        { title: 'Private Rooms', icon: 'mdi-lock' }
      ]
    }
  },
  methods: {
    ...mapMutations(['LOGOUT_USER', 'UPDATE_SNACKBAR']),
    logOut() {
      this.LOGOUT_USER()
      this.UPDATE_SNACKBAR({
        type: 'success',
        message: 'Signed Out'
      })
    },
    createRoom() {
      if (!this.loggedIn) {
        this.UPDATE_SNACKBAR({
          type: 'info',
          message: 'Please Login first',
          x: 'top',
          y: 'right'
        })
        return
      }
      let newRoom = {
        userID: this.$store.state.user.id
      }
      RoomService.register(newRoom)
        .then(result => {
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
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    isRoom() {
      return this.$route.name == 'room'
    }
  }
}
</script>

<style scoped>
.logo {
  height: 100%;
  padding: 2px;
}
.topBar {
  flex: none;
}
</style>
