<template>
  <v-app dark>
    <topNav />
    <div class="overlay"></div>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import topNav from "@/components/includes/topNav";

export default {
  components: {
    topNav
  },
  data: () => ({})
};
</script>

<style scoped>
.overlay {
  /* Location of the image */
  background-image: url("https://img-new.cgtrader.com/items/1875913/70c5205bea/lowpoly-scifi-outdoor-pack-3d-model-low-poly-fbx-mat.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-color: #464646;
  width: 100%;
  height: 100%;
  position: absolute;
}
.container {
  height: 100%;
}
</style>
