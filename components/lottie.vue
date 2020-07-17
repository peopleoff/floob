<template>
  <div :style="styles" ref="lavContainer"></div>
</template>

<script>
import lottie from "lottie-web";

export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    styles: {
      type: Object,
      required: false
    }
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.lavContainer,
      renderer: "svg",
      loop: this.options.loop,
      autoplay: this.options.autoplay,
      path: this.options.path
    });
    this.$emit("animCreated", this.anim);
  }
};
</script>