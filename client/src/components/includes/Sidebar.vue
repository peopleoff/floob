<template>
  <v-navigation-drawer permanent app :mini-variant="mini" color="purple">
    <v-list-item v-if="!mini">
      <router-link
        to="/"
        tag="img"
        :src="require('@/assets/images/logo-text.svg')"
        class="logo pointer"
      ></router-link>
    </v-list-item>
    <v-list-item v-else>
      <router-link
        to="/"
        tag="img"
        :src="require('@/assets/images/logo.svg')"
        class="logo-mobile pointer"
      ></router-link>
    </v-list-item>
    <v-btn icon @click.stop="mini = !mini" class="mini">
      <v-icon v-if="mini">mdi-chevron-right</v-icon>
      <v-icon v-else>mdi-chevron-left</v-icon>
    </v-btn>
    <v-list nav>
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-list-item v-on="on" class="pointer" link @click="createRoom">
            <v-list-item-icon>
              <v-icon>mdi-folder-plus-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Create Room</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <span v-if="mini">Create Room</span>
      </v-tooltip>
    </v-list>
    <template v-slot:append>
      <v-list nav v-if="loggedIn">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-list-item v-on="on" class="pointer" link>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Account</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span v-if="mini">Account</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-list-item v-on="on" class="pointer" link>
              <v-list-item-icon>
                <v-icon>mdi-settings</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span v-if="mini">Settings</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-list-item v-on="on" @click="logOut()" class="pointer" link>
              <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Log Out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span v-if="mini">Log Out</span>
        </v-tooltip>
      </v-list>
      <v-list nav v-else>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-list-item v-on="on" class="pointer" link to="/Login">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Log In</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span v-if="mini">Log In</span>
        </v-tooltip>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-list-item v-on="on" link to="/Signup">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Sign Up</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span v-if="mini">Sign Up</span>
        </v-tooltip>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import RoomService from '@/services/RoomService.js'
import { mapMutations } from 'vuex'
export default {
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
    },
    logOut() {
      this.LOGOUT_USER()
      this.UPDATE_SNACKBAR({
        type: 'success',
        message: 'Signed Out'
      })
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style scoped>
.logo {
  height: 100%;
  width: 100%;
  padding: 8px;
}
.logo-mobile {
  height: 100%;
  max-height: 100px;
  width: 100%;
  padding: 8px;
}
.mini {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
