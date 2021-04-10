<template>
  <section class="d-flex align-center pb-3" v-click-outside="clearInput">
    <div ref="searchInput" class="flex-grow-1">
      <v-text-field
        flat
        hide-details
        outlined
        :label="searchLabel"
        prepend-inner-icon="mdi-magnify"
        full-width
        clearable
        :loading="loading"
        color="legendary_mint"
        class="rounded-lg"
        @input="searchVideos"
        @keydown.enter="addVideoLink"
        v-model="searchCriteria"
      >
        <template slot="append">
          <v-icon
            class="px-2 pointer"
            :class="youtubeActive"
            @click="changeSearchPlatform(1)"
            >mdi-youtube</v-icon
          >
          <v-icon
            class="px-2 pointer"
            :class="vimeoActive"
            @click="changeSearchPlatform(2)"
            >mdi-vimeo</v-icon
          >
          <v-icon
            class="px-2 pointer"
            :class="crunchyrollActive"
            @click="changeSearchPlatform(3)"
            >$crunchyroll</v-icon
          >
        </template>
      </v-text-field>

      <v-list
        id="searchResults"
        v-if="clearResults"
        class="elevation-10 my-3"
        :width="searchResultWidth"
        three-line
      >
        <v-list-item
          v-for="result in searchResult"
          :key="result.src"
          @click="addSearchedVideo(result)"
          class="search-list-items"
        >
          <v-list-item-avatar tile size="60">
            <v-img :src="result.image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="result.title"></v-list-item-title>
            <v-list-item-subtitle
              v-html="result.channel"
            ></v-list-item-subtitle>
            <v-list-item-subtitle
              >{{
                result.publishTime | moment("from", "now", true)
              }}
              ago</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          tile
          v-bind="attrs"
          v-on="on"
          @click="setTheaterMode(!theaterMode)"
        >
          <v-icon class="px-2">mdi-overscan</v-icon>
        </v-btn>
      </template>
      <span>Theater Mode</span>
    </v-tooltip>
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
    ClickOutside,
  },
  data() {
    return {
      searchCriteria: null,
      searchResult: null,
      searchPlatform: {
        id: 1,
        icon: "mdi-youtube",
        name: "YouTube",
      },
    };
  },
  methods: {
    ...mapActions({
      notificationAdd: "notification/add",
      toggleLoginModal: "modal/toggleLoginModal",
      setTheaterMode: "room/setTheaterMode",
    }),
    searchVideos: _.debounce(function () {
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
          provider: this.searchPlatform.id,
        };
        VideoService.search(search)
          .then((response) => {
            this.searchResult = response.data;
          })
          .catch((error) => {
            this.searchCriteria = null;
            this.notificationAdd({
              type: "error",
              message:
                `There was a problem searching ${this.searchPlatform.name} videos, please try again later.`,
            });
          });
      }
    }, 1500),
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
    formatDate(ISODate) {
      const date = new Date(ISODate);
      const mm = date.getMonth();
      const dd = date.getUTCDate();
      const yy = date.getFullYear();
      return mm + "/" + dd + "/" + yy;
    },
    addSearchedVideo(video) {
      //Prompt user to login
      if (!this.$auth.loggedIn) {
        this.toggleLoginModal({ action: "toggle" });
        this.notificationAdd({
          type: "info",
          message: "Please Login To Add Videos",
        });
        return;
      }
      video.room = this.room.id;
      video.user = this.$auth.user.id;
      VideoService.postVideo(video)
        .then((result) => {
          console.log(result);
          this.notificationAdd({
            type: "success",
            message: "Video Added",
          });
        })
        .catch((error) => {
          this.notificationAdd({
            type: "info",
            message: "Error adding video, please try again",
          });
        });
      this.clearInput();
    },
    addVideoLink() {
      //Prompt user to login
      if (!this.$auth.loggedIn) {
        this.toggleLoginModal({ action: "toggle" });
        this.notificationAdd({
          type: "info",
          message: "Please Login To Add Videos",
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
        user: this.$auth.user.id,
      };
      // video, provider, room_id, userID
      VideoService.postVideo(video)
        .then((result) => {
          this.clearInput();
          this.notificationAdd({
            type: "success",
            message: "Video Added",
          });
        })
        .catch((error) => {
          this.clearInput();
          this.notificationAdd({
            type: "info",
            message: "Error adding video, please try again",
          });
        });
    },
    changeSearchPlatform(platformID) {
      switch (platformID) {
        case 1:
          this.searchPlatform = {
            id: platformID,
            icon: "mdi-youtube",
            name: "YouTube",
          };
          break;
        case 2:
          this.searchPlatform = {
            id: platformID,
            icon: "mdi-vimeo",
            name: "Vimeo",
          };
          break;
        case 3:
          this.searchPlatform = {
            id: platformID,
            icon: "$crunchyRoll",
            name: "CrunchyRoll",
          };
          break;

        default:
          break;
      }
    },
  },
  computed: {
    ...mapState({
      room: (state) => state.room.room,
      theaterMode: (state) => state.room.theaterMode,
    }),
    youtubeActive: function () {
      return {
        "grey--text": this.searchPlatform.id !== 1,
      };
    },
    vimeoActive: function () {
      return {
        "grey--text": this.searchPlatform.id !== 2,
      };
    },
    crunchyrollActive: function () {
      return {
        "grey--text": this.searchPlatform.id !== 3,
        "crunchy_roll--text": this.searchPlatform.id == 3,
      };
    },
    clearResults: function () {
      if (this.searchResult) {
        return true;
      }
      return false;
    },
    loading: function () {
      if (this.searchCriteria && !this.searchResult) {
        return true;
      }
      return false;
    },
    searchResultWidth: function () {
      return this.$refs.searchInput.offsetWidth;
    },
    searchLabel: function () {
      let label;
      switch (this.searchPlatform.id) {
        case 1:
          label = "Search or Add Youtube Link";
          break;
        case 2:
          label = "Search or Add Vimeo Link";
          break;
        case 3:
          label =
            "Add Crunchyroll Link || https://www.crunchyroll.com/<series>/<title>";
          break;

        default:
          break;
      }
      return label;
    },
  },
  watch: {
    searchCriteria(newValue, oldValue) {
      if (!newValue) {
        this.clearInput();
      }
    },
  },
};
</script>

<style scoped>
#searchResults {
  overflow: auto;
  max-height: 85vh;
  position: absolute;
  z-index: 100;
  background-color: #0f0816;
  padding: 0;
}

.search-list-items:hover {
  cursor: pointer;
  background: #1e142d;
}
</style>