<template>
  <v-app-bar app>
    <router-link to="/" tag="img" :src="require('@/assets/images/logo-text.svg')" class="logo" alt="Floob Logo">
    </router-link>
    <v-layout row align-center style="max-width: 50vw">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        placeholder="Search..."
        single-line
        color="white"
        hide-details
      ></v-text-field>
    </v-layout>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {}
</script>

<style scoped>
.logo{
  height: 100%;
  cursor: pointer;
}

</style>
