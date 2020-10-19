<template>
  <section id="users" class="h100 d-flex flex-column justify-space-between">
    <div id="users">
      <div v-for="user in users" :key="user.id">
        <span class="message" :style="'color:' + user.color">
          {{ user.username }}
        </span>
        <div class="progress-div" v-if="user.videoInfo">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-progress-linear
                color="#9cbaef"
                rounded
                buffer-value="100"
                :value="
                  formatPrecent(
                    user.videoInfo.currentTime,
                    user.videoInfo.duration
                  )
                "
                height="8"
                width="60%"
                v-bind="attrs"
                v-on="on"
              ></v-progress-linear>
            </template>
            <span>{{ formatTime(user.videoInfo.currentTime) }}</span>
          </v-tooltip>

          <div>{{ formatTime(user.videoInfo.duration) }}</div>
        </div>
      </div>
    </div>
    <div>
      <v-btn
        block
        large
        color="kings_purple"
        elevation="2"
        class="rounded-pill"
        @click="getTimeToSync"
      >
        Sync
        <v-icon> mdi-sync </v-icon>
      </v-btn>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Users",
  methods: {
    formatTime(seconds) {
      let formatedTime = new Date(seconds * 1000).toISOString().substr(11, 8);
      let hh = formatedTime.split(":")[0];
      if (hh == "00") {
        formatedTime = formatedTime.substring(3);
      }
      return formatedTime;
    },
    formatPrecent(currentTime, duration) {
      let percent = (currentTime / duration) * 100;
      return percent;
    },
    getTimeToSync() {
      const payload = {
        room_id: this.room.id,
      };
      console.log("test");
      this.$socket.emit("getTimeToSync", payload);
    },
  },
  computed: {
    ...mapState({
      users: (state) => state.room.users,
      room: (state) => state.room.room,
    }),
  },
};
</script>

<style>
.v-progress-linear {
  width: 70%;
}
.progress-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>