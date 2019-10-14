<template>
    <div id="searchbar">
        <v-text-field flat prepend-icon="search" label="Search" @input="searchVideos" v-model="searchCriteria"></v-text-field>
        <v-list subheader id="searchResults" v-if="clearResults" v-clickOutside="clickOffSearch">
            <v-subheader class="border-bottom">
                Top Results
            </v-subheader>
            <v-list-tile avatar v-for="item in searchResult" :key=item.id.videoId>
                <v-list-tile-avatar>
                    <img :src="item.snippet.thumbnails.default.url">
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{item.snippet.title}}</v-list-tile-title>
                    <v-list-tile-sub-title>- {{item.snippet.channelTitle}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-icon class="pointer" @click="addVideo(item.id.videoId)">add</v-icon>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script>
    import _ from 'lodash';
    import ClickOutside from 'vue-click-outside'
    export default {
        name: 'Searchbar',
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
                this.searchResult = data;
            },
        },
        methods: {
            clickOffSearch: function () {
                this.searchResult = null;
                this.searchCriteria = '';
            },
            searchVideos: _.debounce(function () {
                this.$socket.emit('searchVideos', {
                    search: this.searchCriteria
                });
            }, 250),
            addVideo(videoID) {
                let newVideo = {
                    videoLink: videoID,
                    pure: true,
                    roomID: this.$route.params.id,
                    user: this.$store.state.user
                }
                this.$socket.emit('addVideo', newVideo);
            },
        },
        computed: {
            // a computed getter
            clearResults: function () {
                if (this.searchCriteria.length !== 0 && this.searchResult) {
                    return true;
                }
                return false;
            }
        },
    }
</script>

<style scoped>
    #searchbar {
        width: 50%;
    }
    .border-bottom{
        border-bottom: 1px solid #03DAC6;
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