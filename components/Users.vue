<template>
  <div>
    <div v-for="user in users" :key="user.user.id">
      <span class="message" :style="'color:' + user.user.color">
        {{ user.user.username }}
        </span>
      <div class="progress-div" v-if="user.duration">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-progress-linear
              color="#9cbaef"
              rounded
              buffer-value="100"
              :value="formatPrecent(user.currentTime, user.duration)"
              height="8"
              width="60%"
              v-bind="attrs"
              v-on="on"
            ></v-progress-linear>
          </template>
          <span>{{formatTime(user.currentTime)}}</span>
        </v-tooltip>

        <div>{{formatTime(user.duration)}}</div>
      </div>
    </div>
  </div>
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
  },
  computed: {
    ...mapState({
      users: (state) => state.room.users,
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