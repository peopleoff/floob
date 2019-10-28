<template>
  <div id="videoSearch">
    <v-text-field
      flat
      hide-details
      outlined
      prepend-inner-icon="mdi-magnify"
      label="Search"
      full-width
      id="videoBar"
      @input="searchVideos"
      v-model="searchCriteria"
    ></v-text-field>
    <v-list
      id="searchResults"
      v-if="clearResults"
      class="elevation-10 my-3"
      v-clickOutside="clickOffSearch"
      :width="videoWidth()"
    >
      <v-list-item v-for="item in searchResult" :key="item.id.videoId">
        <v-list-item-icon>
          <v-btn icon class="pointer" @click="addVideo(item.id.videoId)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-list-item-icon>
        <v-list-item-avatar>
          <v-img :src="item.snippet.thumbnails.default.url"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="item.snippet.title"></v-list-item-title>
          <v-list-item-subtitle
            v-html="item.snippet.channelTitle"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import _ from 'lodash'
import ClickOutside from 'vue-click-outside'
import { mapMutations } from 'vuex'

export default {
  name: 'VideoSearch',
  directives: {
    ClickOutside
  },
  data() {
    return {
      searchCriteria: '',
      searchResult: null
    }
  },
  sockets: {
    searchResult(data) {
      this.searchResult = data
    }
  },
  methods: {
    ...mapMutations(['UPDATE_SNACKBAR']),
    clickOffSearch: function() {
      this.searchResult = null
      this.searchCriteria = ''
    },
    searchVideos: _.debounce(function() {
      this.$socket.emit('searchVideos', {
        search: this.searchCriteria
      })
    }, 250),
    addVideo(videoID) {
      if (!this.loggedIn) {
        this.UPDATE_SNACKBAR({
          type: 'info',
          message: 'Please Login first'
        })
        return
      }
      let newVideo = {
        videoLink: videoID,
        pure: true,
        roomID: this.$route.params.id,
        user: this.$store.state.user
      }
      this.$socket.emit('addVideo', newVideo)
    },
    videoWidth() {
      let widths = document.getElementById('videoSearch')
      return widths.offsetWidth
    }
  },
  computed: {
    // a computed getter
    clearResults: function() {
      if (this.searchCriteria.length !== 0 && this.searchResult) {
        return true
      }
      return false
    },
    loggedIn() {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style scoped>
#searchbar {
  width: 50%;
}

#searchResults {
  overflow: auto;
  max-height: 85vh;
  position: absolute;
  background: #303030;
  width: 50%;
  z-index: 10000;
}
</style>
