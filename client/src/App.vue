<template>
  <v-app>
    <Topbar />
    <v-content id="content">
      <router-view />
      <Snackbar :snackbar="snackbar" />
      <LoginDialog :dialog="showLoginForm" />
      <Loader :isVisible="loading" />    
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from './components/includes/Sidebar'
import Topbar from './components/includes/Topbar'
import Snackbar from './components/includes/Snackbar'
import Loader from './components/Loader'
import LoginDialog from './components/Dialogs/Signup-Dialog'

import { mapMutations } from 'vuex'

export default {
  components: {
    Sidebar,
    Topbar,
    LoginDialog,
    Loader,
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
    right: false
  }),
  methods: {
    ...mapMutations(['UPDATE_SNACKBAR', 'TOGGLE_FORM'])
  },
  computed: {
    snackbar() {
      return this.$store.state.snackbar
    },
    showLoginForm() {
      return this.$store.state.loginForm
    },
    loading(){
      return this.$store.getters.loading
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
.theme--dark.v-application{
  background: #101010 !important;
}
.h100 {
  height: 100% !important;
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
#content{
  margin-top: 64px;
}
</style>
