<template>
  <v-navigation-drawer permanent app :mini-variant="mini">
    <v-list-item v-if="!mini">
      <router-link
        to="/"
        tag="img"
        :src="require('@/assets/images/logo-text.svg')"
        class="logo"
      ></router-link>
    </v-list-item>
    <v-list-item v-else>
      <router-link
        to="/"
        tag="img"
        :src="require('@/assets/images/logo.svg')"
        class="logo"
      ></router-link>
    </v-list-item>
    <v-btn icon @click.stop="mini = !mini" class="mini">
      <v-icon v-if="mini">mdi-chevron-right</v-icon>
      <v-icon v-else>mdi-chevron-left</v-icon>
    </v-btn>
    <v-list nav>
      <v-tooltip v-for="item in items" :key="item.title" right>
        <template v-slot:activator="{ on }">
          <v-list-item v-on="on" class="pointer" link :to="item.to">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <span v-if="mini">{{ item.title }}</span>
      </v-tooltip>
    </v-list>
    <template v-slot:append>
      <v-list nav v-if="loggedIn">
        <v-list-item link to="/Login">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/Signup">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list nav v-else>
        <v-list-item link to="/Login">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Log In</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/Signup">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sign Up</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      mini: false,
      items: [
        { title: 'Home', icon: 'mdi-home', to: '/' },
        { title: 'Search Rooms', icon: 'mdi-magnify' },
        { title: 'Public Rooms', icon: 'mdi-lock-open-variant' },
        { title: 'Private Rooms', icon: 'mdi-lock' }
      ]
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style scoped>
.logo {
  height: 100%;
  width: 100%;
  padding: 8px;
}
.mini {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
