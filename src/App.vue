<template>
  <v-app>
    <Topbar @toggleSidebar="toggleSidebar" />
    <v-navigation-drawer
      v-model="drawer"
      class="primary"
      aria-label="Navigation Button"
      overlay-color="secondary"
      app
      temporary
    >
      <v-list-item color="secondary" @click="toggleSidebar">
        <v-list-item-avatar tile height="100%">
          <v-img :src="require('@/assets/images/floob-logo-white.svg')"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Floob.gg</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <template v-slot:append>
        <v-list>
          <v-list-item
            link
            to="//www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=LUBJ846KR6SKS&source=url"
            target="_blank"
            rel="noreferrer"
          >
            <v-list-item-icon>
              <v-icon>mdi-heart</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Donate</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list v-if="loggedIn">
          <v-list-item button link @click="createRoom">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Create Room</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item button link @click="logOut">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item link to="/Login">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Log In</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link to="/Signup">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sign Up</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-content id="content">
      <router-view />
      <Snackbar :snackbar="snackbar" />
      <LoginDialog />
      <Loader :isVisible="loading" />
    </v-content>
  </v-app>
</template>

<script>
import Topbar from './components/includes/Topbar'
import Snackbar from './components/includes/Snackbar'
import Footer from './components/includes/Footer'
import Loader from './components/Loader'
const LoginDialog = () => import('@/components/Dialogs/Signup-Dialog')
const FeedbackDialog = () => import('@/components/Dialogs/Feedback-Dialog')
import RoomService from '@/services/RoomService.js'

import { mapMutations } from 'vuex'

export default {
  components: {
    Topbar,
    LoginDialog,
    FeedbackDialog,
    Loader,
    Footer,
    Snackbar
  },
  sockets: {
    updateSnackbar(data) {
      this.UPDATE_SNACKBAR(data)
    }
  },
  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Photos', icon: 'mdi-image' },
      { title: 'About', icon: 'mdi-help-box' }
    ],
    drawer: false
  }),
  methods: {
    ...mapMutations(['UPDATE_SNACKBAR', 'TOGGLE_FORM', 'TOGGLE_FEEDBACK', 'LOGOUT_USER']),
    toggleSidebar() {
      this.drawer = !this.drawer
    },
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
    snackbar() {
      return this.$store.state.snackbar
    },
    loading() {
      return this.$store.getters.loading
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap');
* {
  font-family: 'Poppins', sans-serif;
}
html,
body {
  overscroll-behavior: none;
}
.theme--dark.v-application {
  background: #101010 !important;
}
.h100 {
  height: 100% !important;
}

.w100 {
  width: 100% !important;
}

.w0 {
  width: 0 !important;
}

.v-text-field--filled.v-text-field--single-line input,
.v-text-field--full-width.v-text-field--single-line input {
  margin-top: 0px !important;
}

.pointer {
  cursor: pointer;
}
#content {
  margin-top: 55px;
}
@media only screen and (max-width: 959px) {
  .container{
    padding: 0;
  }
}
</style>
