<template>
  <v-app>
    <Sidebar />
    <v-content>
      <router-view />
      <Snackbar :snackbar="snackbar" />
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from './components/includes/Sidebar'
import Snackbar from './components/includes/Snackbar'

export default {
  components: {
    Sidebar,
    Snackbar
  },
  data: () => ({
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Photos', icon: 'mdi-image' },
      { title: 'About', icon: 'mdi-help-box' }
    ],
    right: null
  }),
  computed: {
    snackbar() {
      return this.$store.state.snackbar
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
* {
  font-family: 'Poppins', sans-serif;
}
.logo {
  height: 100%;
  width: 100%;
  padding: 8px;
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
</style>
