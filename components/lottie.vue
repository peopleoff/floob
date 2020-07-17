<template>
  <div id="app">
    <div :style="style" ref="lavContainer"></div>
    <div>
      <p>Speed: x{{animationSpeed}}</p>
      <input
        type="range"
        value="1"
        min="0"
        max="3"
        step="0.5"
        v-on:change="onSpeedChange"
        v-model="animationSpeed"
      />
    </div>
    <button v-on:click="stop">stop</button>
    <button v-on:click="pause">pause</button>
    <button v-on:click="play">play</button>
  </div>
</template>
 
<script>
import * as animationData from "@/assets/images/Landingpage.json";
import lottie from "lottie-web";

export default {
  name: "app",
  data() {
    return {
      defaultOptions: { animationData: animationData },
      animationSpeed: 1,
      style: {
        width: this.width ? `${this.width}px` : "100%",
        height: this.height ? `${this.height}px` : "100%",
        overflow: "hidden",
        margin: "0 auto"
      }
    };
  },
  mounted() {
    this.anim = lottie.loadAnimation({
      container: this.$refs.lavContainer,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/images/Landingpage.json"
    });
    this.$emit("animCreated", this.anim);
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },

    stop: function() {
      this.anim.stop();
    },

    play: function() {
      this.anim.play();
    },

    pause: function() {
      this.anim.pause();
    },

    onSpeedChange: function() {
      this.anim.setSpeed(this.animationSpeed);
    }
  }
};
</script>

<style scoped>
</style>