<template>
    <nav id="navbar-main" class="navbar navbar-main navbar-expand-lg navbar-transparent" v-if="this.$store.state.user">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global"
                aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbar_global">
                <div class="navbar-collapse-header">
                    <div class="row">
                        <div class="col-6 collapse-close">
                            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar_global"
                                aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
                <ul class="navbar-nav navbar-nav-hover align-items-lg-center" id="search">
                    <li class="nav-item dropdown">
                        <div class="input-group">
                            <div data-v-62ea4d0d="" class="input-group-prepend"><span data-v-62ea4d0d="" class="input-group-text"
                                    style="
    background: transparent;
"><i data-v-62ea4d0d="" class="ni ni-zoom-split-in"></i></span></div>
                            <input type="text" placeholder="Search YouTube" class="form-control" v-model="searchCriteria"
                                @input="searchVideos">
                        </div>
                        <ul v-if="clearResults" id="searchResults" class="list-group list-group-flush" v-click-outside="clickOffSearch">
                            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="video in searchResult.items"
                                v-if="video.id.videoId" v-bind:key="video.id.videoId">
                                <img v-bind:src="video.snippet.thumbnails.default.url" alt="">
                                <span>{{ video.snippet.title }}</span>
                                <span class="badge badge-primary badge-pill click" v-on:click="addVideo(video.id.videoId)"><i
                                        class="ni ni-fat-add"></i></span>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link" data-toggle="dropdown" role="button">
                            <i class="ni ni-collection d-lg-none"></i>
                            <span class="nav-link-inner--text">{{ this.$store.state.user.username }}</span>
                        </a>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item">Landing</a>
                            <a href="#" class="dropdown-item">Profile</a>
                            <a href="#" class="dropdown-item">Login</a>
                            <a href="#" class="dropdown-item" style="color: red;" v-on:click="signOut()">Sign Out</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- <nav id="navbar-main" class="navbar navbar-main navbar-expand-lg navbar-transparent navbar-light"
        v-if="this.$store.state.user">
        <div class="container-fluid">
            <a class="navbar-brand mr-lg-5" href="../index.html">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global"
                aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbar_global">
                <div class="navbar-collapse-header">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                        </div>
                        <div class="col-6 collapse-close">
                            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar_global"
                                aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
                <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link" data-toggle="dropdown" role="button">
                            <i class="ni ni-collection d-lg-none"></i>
                            <span class="nav-link-inner--text">{{ this.$store.state.user.username }}</span>
                        </a>
                        <div class="dropdown-menu">
                            <button type="button" class="btn btn-danger" v-on:click="signOut()">Sign Out</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav> -->
</template>

<script>
    import {
        mapMutations
    } from 'vuex';
    import _ from 'lodash';
    import {
        ClickOutside
    } from '@/components/directives/click-outside.js';

    export default {
        name: 'TopNav',
        directives: {
            ClickOutside
        },
        data() {
            return {
                searchResult: null,
                searchCriteria: '',
            }
        },
        sockets: {
            status(data) {
                let self = this;
                this.status = data;
                setTimeout(function () {
                    self.status = '';
                }, 5000);
            },
            searchResult(data) {
                this.searchResult = data;
            },
        },
        methods: {
            ...mapMutations([
                'SIGN_OUT'
            ]),
            signOut: function () {
                this.SIGN_OUT();
            },
            clickOffSearch: function () {
                this.searchResult = null;
                this.searchCriteria = '';
            },
            searchVideos: _.debounce(function (e) {
                console.log(e.target.value)
                this.$socket.emit('searchVideos', {
                    search: this.searchCriteria
                });
            }, 250),
            addVideo: _.debounce(function (videoID) {
                this.$socket.emit('addVideo', {
                    user: this.$store.state.user,
                    video: videoID
                });
            }, 100),
            // addVideo: function (videoID) {
            //     _.debounce(() => {
            //         this.$socket.emit('addVideo', {
            //             user: this.$store.state.user,
            //             video: videoID
            //         });
            //     }, 2000)
            // },
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
        watch: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #navbar_global {
        justify-content: flex-end
    }
    .input-group-text{
        background: transparent;
        border: 0;
        border-bottom: 1px solid #cad1d7;
    }

    .navbar {
        padding: 1rem 5rem;
    }

    input {
        background: transparent;
        border: 0;
        border-bottom: 1px solid #cad1d7;
    }

    input:focus {
        background: transparent;
        border: 0;
        border-bottom: 1px solid #cad1d7;
    }

    #searchResults {
        overflow: auto;
        max-height: 85vh;
        position: absolute;
    }

    #search {
        width: 50%;
    }

    #search li {
        width: 100%;
        font-size: 14px;
    }

    #search img {
        width: 10%;
    }

    button {
        margin: 10px;
    }

    .navbar-nav.navbar-nav-hover .nav-item.dropdown:hover>.dropdown-menu {
        margin: 0;
        min-width: 0;
        padding: 0;
        transition: none;
    }

    .navbar-nav.navbar-nav-hover .dropdown-menu {
        transition: none !important;
    }

    @media (max-width: 991.98px) {
        #search {
            width: 100%;
            max-height: 70vh;
            overflow: scroll;
        }
        #searchResults{
            position: relative;
        }
    }
</style>