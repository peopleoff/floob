<template>
  <v-snackbar
    v-model="active"
    :color="snackbar.type"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :right="x === 'right'"
    :top="y === 'top'"
    :timeout="timeout"
    v-if="snackbar"
  >
    <div v-html="snackbar.message"></div>
    <v-icon @click="active = false">mdi-close</v-icon>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',
  props: ['snackbar'],
  data() {
    return {
      active: false,
      timeout: 3000
    }
  },
  sockets: {
    message: function(payload) {
      this.active = true
      this.snackbar = payload
    }
  },
  methods: {
    toggleSignup() {
      console.log('test')
    }
  },
  computed: {
    x() {
      return this.snackbar.x || ''
    },
    y() {
      return this.snackbar.y || 'top'
    }
  },
  watch: {
    snackbar() {
      this.active = true
    }
  }
}
</script>

<style></style>
