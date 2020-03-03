<template>
  <div class="h100">
    <v-app-bar app>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 50vw">
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          placeholder="Search..."
          single-line
          hide-details
          outlined
          filled
          dense
        ></v-text-field>
      </v-layout>
      <v-spacer></v-spacer>
    </v-app-bar>
      <v-row no-gutters class="h100">
        <v-col sm="9">
          <v-sheet height="100%" width="100%" color="white"> </v-sheet>
        </v-col>
        <v-col>
            <chat />
        </v-col>
      </v-row>
  </div>
</template>

<script>
import chat from '@/components/chat'
export default {
  layout: "room",
  components:{
      chat
  }
};
</script>

<style></style>
