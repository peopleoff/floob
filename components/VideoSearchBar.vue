<template>
  <section class="d-flex align-center" v-click-outside="clearInput">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <v-icon>{{searchPlatform.icon}}</v-icon>
          <v-icon>mdi-chevron-down</v-icon>
        </div>
      </template>
      <v-list>
        <v-list-item @click="changeSearchPlatform(1)">
          <v-list-item-title>
            <v-icon>mdi-youtube</v-icon>YouTube
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeSearchPlatform(2)">
          <v-list-item-title>
            <v-icon>mdi-vimeo</v-icon>Vimeo
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div ref="searchInput" class="flex-grow-1">
      <v-text-field
      class="rounded-lg"
        hide-details
        outlined
        prepend-inner-icon="mdi-magnify"
        label="Search or Add Videos"
        width="50"
        clearable
        :loading="loading"
        color="legendary_mint"
        @input="searchVideos"
        @keydown.enter="addVideoLink"
        v-model="searchCriteria"
      ></v-text-field>

      <v-list
        id="searchResults"
        v-if="clearResults"
        class="elevation-10 my-3"
        :width="searchResultWidth"
        three-line
      >
        <v-list-item v-for="result in searchResult" :key="result.src">
          <v-list-item-avatar tile size="60">
            <v-img :src="result.image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="result.title"></v-list-item-title>
            <v-list-item-subtitle v-html="result.channel"></v-list-item-subtitle>
            <v-list-item-subtitle>{{ result.publishTime | moment("from", "now", true) }} ago</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon  @click="addSearchedVideo(result)">
              <v-icon color="success lighten-1">mdi-plus</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>
    <v-btn icon tile v-if="!showChat" @click="toggleChat">
      <v-icon>mdi-arrow-collapse-left</v-icon>
    </v-btn>
  </section>
</template>

<script>
import _ from "lodash";
import ClickOutside from "vue-click-outside";
import VideoService from "@/services/VideoService";
import { mapState, mapActions } from "vuex";
export default {
  props: ["showChat"],
  directives: {
    ClickOutside
  },
  data() {
    return {
      searchCriteria: null,
      searchResult: null,
      searchPlatform: {
        id: 1,
        icon: "mdi-youtube",
        name: "YouTube"
      }
    };
  },
  methods: {
    ...mapActions({
      notificationAdd: "notification/add",
      toggleLoginModal: "modal/toggleLoginModal"
    }),
    searchVideos: _.debounce(function() {
      if (!this.searchCriteria) {
        return;
      }
      //If user enters a url change the provider icons
      if (this.validURL(this.searchCriteria)) {
        let providerID = null;
        let linkHostname = this.getHostname(this.searchCriteria);
        if (linkHostname.includes("youtu")) {
          providerID = 1;
        } else if (linkHostname.includes("vimeo")) {
          providerID = 2;
        } else {
          providerID = 3;
        }
        this.changeSearchPlatform(providerID);
      }
      if (
        !this.validURL(this.searchCriteria) &&
        this.searchCriteria.length > 2
      ) {
        let search = {
          query: this.searchCriteria,
          provider: this.searchPlatform.id
        };
        VideoService.search(search).then(response => {
          this.searchResult = response.data;
        });
      }
    }, 500),
    clearInput() {
      this.searchCriteria = null;
      this.searchResult = null;
    },
    videoWidth() {
      let widths = document.getElementById("videoSearch");
      return widths.offsetWidth;
    },
    toggleChat() {
      this.$emit("toggleChat");
    },
    formatDate(ISODate){
      const date = new Date(ISODate);
      const mm = date.getMonth();
      const dd = date.getUTCDate();
      const yy = date.getFullYear();
      return mm + '/' + dd + '/' + yy;
    },
    addSearchedVideo(video) {
      //Prompt user to login
      if (!this.$auth.loggedIn) {
        this.toggleLoginModal();
        this.notificationAdd({
          type: "info",
          message: "Please Login To Add Videos"
        });
        return;
      }
      video.room = this.room.id;
      video.user = this.$auth.user.id;
      VideoService.postVideo(video)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.erro(error);
        });
      this.clearInput();
    },
    addVideoLink() {
      //Prompt user to login
      if (!this.$auth.loggedIn) {
        this.toggleLoginModal();
        this.notificationAdd({
          type: "info",
          message: "Please Login To Add Videos"
        });
        return;
      }
      //Not a valid URL and enter key was pressed
      if (!this.validURL(this.searchCriteria)) {
        return;
      }
      let providerID = null;
      let linkHostname = this.getHostname(this.searchCriteria);
      if (linkHostname.includes("youtu")) {
        providerID = 1;
      } else if (linkHostname.includes("vimeo")) {
        providerID = 2;
      } else {
        providerID = 3;
      }
      this.changeSearchPlatform(providerID);
      const video = {
        src: this.searchCriteria,
        provider: providerID,
        room: this.room.id,
        user: this.$auth.user.id
      };
      // video, provider, roomID, userID
      switch (video.provider) {
        case 1:
          console.log("added youtube Video");
          VideoService.postVideo(video)
            .then(result => {
              console.log(result);
            })
            .catch(error => {
              console.erro(error);
            });
          break;
        case 2:
          console.log("Added vimeo video");
          break;

        default:
          break;
      }
      this.clearInput();
    },
    changeSearchPlatform(platformID) {
      console.log(platformID);
      switch (platformID) {
        case 1:
          this.searchPlatform = {
            id: platformID,
            icon: "mdi-youtube",
            name: "YouTube"
          };
          break;
        case 2:
          this.searchPlatform = {
            id: platformID,
            icon: "mdi-vimeo",
            name: "Vimeo"
          };
          break;

        default:
          break;
      }
    }
  },
  computed: {
    ...mapState({
      room: state => state.room.room
    }),
    clearResults: function() {
      if (this.searchResult) {
        return true;
      }
      return false;
    },
    loading: function() {
      if (this.searchCriteria && !this.searchResult) {
        return true;
      }
      return false;
    },
    searchResultWidth: function() {
      return this.$refs.searchInput.offsetWidth;
      return "200";
    }
  },
  watch: {
    searchCriteria(newValue, oldValue) {
      if (!newValue) {
        this.clearInput();
      }
    }
  }
};
</script>

<style scoped>
#searchResults {
  overflow: auto;
  max-height: 85vh;
  position: absolute;
  z-index: 100;
}
</style>