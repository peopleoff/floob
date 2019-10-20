<template>
  <v-dialog v-model="dialog" max-width="50%" @input="close">
    <v-card color="basil">
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="form in forms" :key="form">
          <v-card flat color="basil">
            <component :is="form" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
import Signup from "@/components/SignupForm";
import Login from "@/components/LoginForm";
export default {
  components: {
    Signup,
    Login
  },
  props: ["dialog"],
  data: () => ({
    tab: null,
    items: ["Login", "Sign Up"],
    forms: ["Login", "Signup"]
  }),
  methods: {
    close: function(event) {
      this.$emit("closeDialog");
    }
  }
};
</script>

<style>
</style>