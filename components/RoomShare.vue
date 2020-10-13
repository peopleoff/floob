<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <div
        class="ma-0 pointer"
        @click="copyRoomCode(room.room_uuid)"
        v-if="room"
        v-bind="attrs"
        v-on="on"
      >
        <span class="hidden-sm-and-down">Room Code: {{room.room_uuid}}</span>
        <span class="hidden-md-and-up">Share Room</span>
        <lottie :options="options" :styles="styles" @animCreated="animCreated" />
      </div>
    </template>
    <span>Copy Room Link</span>
  </v-tooltip>
</template>

<script>
import { mapActions, mapState } from "vuex";
import lottie from "@/components/lottie";

export default {
  components: {
    lottie,
  },
  data() {
    return {
      styles: {
        width: "24px",
        height: "24px",
        float: "right",
      },
      options: {
        path: "/images/lottie/copy-icon.json",
        autoplay: false,
        loop: false,
      },
    };
  },
  methods: {
    ...mapActions({
      notificationAdd: "notification/add",
    }),
    animCreated(event) {
      this.anim = event;
    },
    copyRoomCode(text) {
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = "https://" + location.host + "/room/" + text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      this.anim.setDirection(1);
      this.anim.play();
      setTimeout(() => {
        this.anim.setDirection(-1);
        this.anim.play();
      }, 2000);
    },
  },
  computed: {
    ...mapState({
      room: (state) => state.room.room,
    }),
  },
};
</script>

<style>
</style>