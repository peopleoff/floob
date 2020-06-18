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
        hide-details
        outlined
        prepend-inner-icon="mdi-magnify"
        label="Search or Add Videos"
        width="50"
        clearable
        :loading="loading"
        @input="searchVideos"
        @keydown.enter="addVideoLink"
        v-model="searchCriteria"
      ></v-text-field>

      <v-list
        id="searchResults"
        v-if="clearResults"
        class="elevation-10 my-3"
        :width="searchResultWidth"
      >
        <v-list-item v-for="result in searchResult" :key="result.src">
          <v-list-item-icon class="mr-0">
            <v-btn icon class="pointer secondary--text" @click="addSearchedVideo(result)">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-list-item-icon>
          <v-list-item-avatar tile size="80">
            <v-img :src="result.image"></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="ml-2">
            <v-list-item-title v-html="result.title"></v-list-item-title>
            <v-list-item-subtitle v-html="result.channel"></v-list-item-subtitle>
          </v-list-item-content>
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
import { mapState } from "vuex";
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
    addSearchedVideo(video) {
      video.room = this.$route.params.id;
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
        room: this.$route.params.id,
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
  z-index: 10000;
}
</style>