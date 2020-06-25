<template>
  <v-dialog v-model="showLoginModal" @click:outside="toggleLoginModal" max-width="600px">
    <authTabs />
  </v-dialog>
</template>

<script>
import authTabs from "@/components/auth/authTabs";
import { mapActions, mapGetters  } from "vuex";
export default {
  components: {
    authTabs
  },
  methods: {
    ...mapActions({
      toggleLoginModal: "modal/toggleLoginModal"
    })
  },
  computed: {
    ...mapGetters({
      showLoginModal: 'modal/showLoginModal'
    })
  }
};
</script>

<style>
</style>