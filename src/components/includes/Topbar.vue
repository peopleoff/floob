<template>
  <v-app-bar class="topBar" color="purple" fixed flat>
    <router-link
      to="/rooms"
      tag="img"
      :src="imageHeight"
      class="logo pointer"
    ></router-link>
    <v-spacer></v-spacer>
    <div style="width: 50%;" v-if="isRoom">
      <VideoSearch></VideoSearch>
    </div>
    <v-spacer></v-spacer>
    <v-menu bottom left offset-y v-if="$vuetify.breakpoint.smAndDown">
      <template v-slot:activator="{ on }">
        <v-btn dark icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list v-if="loggedIn">
        <v-list-item v-show="!isRoom" @click="createRoom">
                  <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
          <v-list-item-title>Create a Room</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logOut()">
                  <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item to="/Login">
                <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
          <v-list-item-title>Log In</v-list-item-title>
        </v-list-item>
        <v-list-item to="/Signup">
                <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
          <v-list-item-title>Sign Up</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div v-else>
      <div class="d-flex" v-if="loggedIn">
        <v-btn
          class="ma-2"
          color="secondary"
          v-show="!isRoom"
          @click="createRoom"
        >
          Create a Room
        </v-btn>
        <v-btn class="ma-2" outlined color="secondary" @click="logOut()">
          Log Out
        </v-btn>
      </div>
      <div class="d-flex" v-else>
        <v-btn class="ma-2" outlined color="secondary" to="/Login"
          >Log In</v-btn
        >
        <v-btn class="ma-2 purple--text" color="secondary" to="/Signup">
          Sign Up
        </v-btn>
      </div>
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
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return require('@/assets/images/logo.svg')
        case 'sm':
          return require('@/assets/images/logo.svg')
        case 'md':
          return require('@/assets/images/logo-text.svg')
        case 'lg':
          return require('@/assets/images/logo-text.svg')
        case 'xl':
          return require('@/assets/images/logo-text.svg')
      }
    },
    isRoom() {
      return this.$route.name == 'room' || this.$route.name == 'RoomCompanion'
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
