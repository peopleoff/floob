<template>
  <div id="videoSearch">
    <v-text-field
      flat
      hide-details
      outlined
      prepend-inner-icon="mdi-magnify"
      label="Search or Add Videos"
      full-width
      @input="searchVideos"
      @keydown.enter="addVideoLink"
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
        <v-list-item-icon class="mr-0">
          <v-btn icon class="pointer secondary--text" @click="addVideo(item.id.videoId)">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-list-item-icon>
        <v-list-item-avatar tile size="80">
          <v-img :src="item.snippet.thumbnails.default.url"></v-img>
        </v-list-item-avatar>

        <v-list-item-content class="ml-2">
          <v-list-item-title v-html="item.snippet.title"></v-list-item-title>
          <v-list-item-subtitle v-html="item.snippet.channelTitle"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import _ from 'lodash'
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
    getVideoID(name, url) {
      if (url.includes('youtu.be')) {
        let index = 0
        //Mobile Link
        let firstCheck = url.split('/')[url.split('/').length - 1]
        if (firstCheck.length > 0) {
          index = url.split('/').length - 1
        } else {
          index = url.split('/').length - 2
        }
        let videoID = url.split('/')[index]
        return videoID
      }
      if (!url) url = window.location.href
      name = name.replace(/[\[\]]/g, '\\$&')
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    },
    searchVideos: _.debounce(function() { 
      let user = null;
      if (this.loggedIn) {
        user = this.$store.state.user.id
      }
      this.$socket.emit('searchVideos', {
        search: this.searchCriteria,
        roomID: this.$route.params.id,
        user: user
      })
    }, 500),
    addVideo(videoID) {
      if (!this.loggedIn) {
        this.UPDATE_SNACKBAR({
          type: 'info',
          message: 'Please Login first',
          x: 'left',
          y: 'top'
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
      this.searchResult = []
    },
    addVideoLink() {
      if (!this.loggedIn) {
        this.UPDATE_SNACKBAR({
          type: 'info',
          message: 'Please Login first',
          x: 'right',
          y: 'top'
        })
        return
      }
      let user = this.$store.state.user
      let videoID = this.getVideoID('v', this.searchCriteria)
      if(!videoID){
        return;
      }
      let newVideo = {
        videoLink: videoID,
        pure: true,
        roomID: this.$route.params.id,
        user: this.$store.state.user
      }
      this.$socket.emit('addVideo', newVideo)
      this.searchCriteria = ''
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
#searchResults {
  overflow: auto;
  max-height: 85vh;
  position: absolute;
  width: 50%;
  z-index: 10000;
}
</style>
