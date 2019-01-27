<template>
  <v-app dark>
    <Header />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
      <Snackbar :snackbar="snackbar"/>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/includes/Header'
import Snackbar from './components/includes/Snackbar'

export default {
  name: 'App',
  components: {
    Header,
    Snackbar
  },
  data () {
    return {
      //
    }
  },
  computed:{
    snackbar(){
      return this.$store.state.snackbar
    }
  }
}
</script>
