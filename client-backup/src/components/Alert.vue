<template>
  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>

      <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn text @click="dialog = false">I accept</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "Alert",
  data() {
    return {
      dialog: true
    };
  },
  methods: {
    clickOffSearch: function() {
      this.searchResult = null;
      this.searchCriteria = "";
    },
    searchVideos: _.debounce(function() {
      this.$socket.emit("searchVideos", {
        search: this.searchCriteria
      });
    }, 250),
    addVideo(videoID) {
      let newVideo = {
        videoLink: videoID,
        pure: true,
        roomID: this.$route.params.id,
        user: this.$store.state.user
      };
      this.$socket.emit("addVideo", newVideo);
    }
  }
};
</script>

<style scoped>
#searchbar {
  width: 50%;
}
.border-bottom {
  border-bottom: 1px solid #03dac6;
}

#searchResults {
  overflow: auto;
  max-height: 85vh;
  position: absolute;
  width: 45%;
  top: 70%;
  margin-left: 2.2rem;
  background: #303030;
}
</style>