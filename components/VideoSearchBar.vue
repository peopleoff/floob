<template>
  <section class="d-flex align-center">
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
            <v-list-item-title>{{result.title}}</v-list-item-title>
            <v-list-item-subtitle>{{result.channel}}</v-list-item-subtitle>
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
import VideoService from "@/services/VideoService";

export default {
  props: ["showChat"],
  data() {
    return {
      searchCriteria: "",
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
      if (
        this.validURL(this.searchCriteria) ||
        this.searchCriteria.length < 2
      ) {
        return;
      }
      console.log("searched");
      let search = {
        query: this.searchCriteria,
        provider: this.searchPlatform.id
      };
      VideoService.search(search).then(response => {
        this.searchResult = response.data;
      });
    }, 500),
    videoWidth() {
      let widths = document.getElementById("videoSearch");
      return widths.offsetWidth;
    },
    toggleChat() {
      this.$emit("toggleChat");
    },
    addSearchedVideo(video) {
      video.room = 1;
      video.user = 1;
      console.log(video);
      VideoService.postVideo(video)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.erro(error);
        });
    },
    addVideoLink(event, searchedVideo) {
      //Not a valid URL and enter key was pressed
      if (!this.validURL(this.searchCriteria) && !searchedVideo) {
        return;
      }
      let video;
      if (searchedVideo) {
        video = {
          video: searchedVideo.src,
          provider: searchedVideo.provider,
          roomID: 1,
          userID: 1
        };
      } else {
        video = {
          video: this.searchCriteria,
          provider: this.searchPlatform.id,
          roomID: 1,
          userID: 1
        };
      }
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
      this.searchCriteria = null;
      this.searchResult = [];
    },
    changeSearchPlatform(platformID) {
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
    clearResults: function() {
      if (this.searchCriteria && this.searchResult) {
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
        this.searchResult = [];
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