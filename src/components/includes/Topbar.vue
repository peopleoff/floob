<template>
  <v-app-bar class="topBar" color="purple" fixed flat>
    <v-app-bar-nav-icon @click.stop="toggleSidebar"></v-app-bar-nav-icon>
    <router-link
      to="/rooms"
      tag="img"
      :src="imageHeight"
      class="logo pointer"
      alt="Floob Logo"
    ></router-link>
    <v-spacer></v-spacer>
    <div style="width: 75%;" v-if="isRoom">
      <VideoSearch></VideoSearch>
    </div>
    <v-spacer></v-spacer>
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
    toggleSidebar() {
      this.$emit('toggleSidebar')
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
