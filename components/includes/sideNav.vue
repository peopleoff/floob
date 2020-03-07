<template>
  <v-navigation-drawer permanent expand-on-hover app>
    <v-list-item two-line>
        <v-img :src="require('@/assets/images/logo-white.svg')"></v-img>
      <v-list-item-content>
        <v-list-item-title>Floob</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <!-- <div>
      <v-img :src="require('@/assets/images/logo.svg')" v-if="mini"></v-img>
      <v-img :src="require('@/assets/images/logo-white.svg')" v-else></v-img>
    </div> -->

    <v-list nav dense class="bottom-icons">
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-cogs</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Settings</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-box-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Sign-Out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {};
</script>

<style scoped>
.bottom-icons{
  position: absolute;
  bottom: 0;
  width: 100%;
}

</style>
