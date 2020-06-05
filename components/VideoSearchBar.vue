<template>
  <div id="videoSearch">
    <v-text-field
      hide-details
      outlined
      prepend-inner-icon="mdi-magnify"
      label="Search or Add Videos"
      clearable
      @input="searchVideos"
      @keydown.enter="addVideoLink"
      v-model="searchCriteria"
    >
      <template v-slot:prepend>
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
      </template>
    </v-text-field>
    <v-list id="searchResults" v-if="clearResults" class="elevation-10 my-3" :width="videoWidth()">
      <v-list-item v-for="(item, index) in searchResult" :key="index">
        <v-list-item-icon class="mr-0">
          <v-btn icon class="pointer secondary--text">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-list-item-icon>
        <v-list-item-avatar tile size="80">
          <v-img src="https://via.placeholder.com/150"></v-img>
        </v-list-item-avatar>

        <v-list-item-content class="ml-2">
          <v-list-item-title>{{item.title}}</v-list-item-title>
          <v-list-item-subtitle>{{item.channel}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import _ from "lodash";
import VideoService from "@/services/VideoService";

export default {
  props: ["showChat"],
  methods: {
    toggleChat() {
      this.$emit("toggleChat");
    }
  },
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
      console.log("searched");
      let search = {
        query: this.searchCriteria,
        platformID: this.searchPlatform.id
      };
      VideoService.search(search).then(response => {
        console.log(response);
        this.searchResult = response.data;
      });
    }, 500),
    videoWidth() {
      let widths = document.getElementById("videoSearch");
      return widths.offsetWidth;
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
    // a computed getter
    clearResults: function() {
      if (this.searchCriteria.length !== 0 && this.searchResult) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
#searchResults {
  overflow: auto;
  max-height: 85vh;
  position: absolute;
  width: 100%;
  z-index: 10000;
}
</style>