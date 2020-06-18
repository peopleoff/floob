<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab>Login</v-tab>
      <v-tab>Sign-Up</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <login />
      </v-tab-item>
      <v-tab-item>
        <register />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import login from "@/components/auth/login";
import register from "@/components/auth/register";

export default {
  components: {
    login,
    register
  },
  data() {
    return {
      tab: 0
    };
  }
};
</script>

<style scoped>

</style>