<template>
  <v-dialog v-model="showLoginForm" @click:outside="toggleForm" max-width="600px">
    <authTabs />
  </v-dialog>
</template>

<script>
import authTabs from "@/components/auth/authTabs";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    authTabs
  },
  methods: {
    ...mapActions({
      toggleForm: "user/toggleForm"
    })
  },
  computed: {
    ...mapState("user", ["showLoginForm"])
  }
};
</script>

<style>
</style>