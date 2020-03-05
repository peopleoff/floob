<template>
  <div v-if="isVisible" class="socket">
    <div class="d-flex justify-center">
      <img class="loading-icon" :src="require('@/assets/images/fliplogoloop.gif')" alt="Floob icon splinning" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    isVisible: { type: Boolean, required: true }
  }
}
</script>

<style scoped>
body {
  background: #1e1e1e;
  overflow: hidden;
  height: 100vh;
}

.socket {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: #1e162c;
  opacity: 0.7;
}
.loading-icon{
  width: 100%;
}

@media only screen and (max-width: 959px) {
  .loading-icon{
    margin-top: 50%;
  }
}
</style>
