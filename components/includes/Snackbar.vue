<template>
  <div v-if="notification">
    <v-snackbar
      v-model="notification"
      :color="notification.type"
      top
      rounded="pill"
      @input="this.remove"
    >
      {{ notification.message }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="remove">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      timeout: null,
    };
  },
  methods: mapActions("notification", ["remove"]),
  computed: mapState("notification", ["notification"]),
};
</script>

<style>
.v-snack__content {
  color: #fff;
}
</style>