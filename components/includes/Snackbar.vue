<template>
  <div v-if="notification">
    <v-snackbar v-model="notification" :color="notification.type" top @input="this.remove">
      {{ notification.message }}
      <v-btn text @click="this.remove">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      timeout: null
    };
  },
  methods: mapActions("notification", ["remove"]),
  computed: mapState("notification", ["notification"])
};
</script>

<style>
</style>