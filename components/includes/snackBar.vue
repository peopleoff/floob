<template>
  <v-snackbar v-model="show">
    {{ message }}
    <v-btn @click.native="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      show: false,
      message: ""
    };
  },
  created: function () {
    this.$store.watch(state => state.utilities.snackbar, () => {
      const msg = this.$store.state.utilities.snackbar
      if (msg) {
        this.show = true
        this.message = this.$store.state.utilities.snackbar.message
        this.$store.commit('utilities/UPDATE_SNACKBAR', null)
      }
    })
  }
};
</script>
