<template>
  <v-app-bar class="search-bar">
    <v-spacer></v-spacer>
    <v-text-field
      name="videoSearch"
      hint="Hint: BlackMesaScientist"
      type="text"
      filled
      outlined
      hide-details
      width="50%"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn v-if="!showChat" icon tile @click="toggleChat" class="hidden-sm-and-down">
      <v-icon>mdi-arrow-collapse-left</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: ["showChat"],
  methods: {
    toggleChat() {
      this.$emit("toggleChat");
    }
  }
};
</script>

<style>
</style>