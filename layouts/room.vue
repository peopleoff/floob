<template>
  <v-app dark>
    <sideNav />
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import topNav from "@/components/includes/topNav";
import sideNav from "@/components/includes/sideNav";

export default {
  components: {
    topNav,
    sideNav
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  }
};
</script>
