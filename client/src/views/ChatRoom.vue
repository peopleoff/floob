<template>
    <div id="chatroom">
        <v-layout class="mx-3 currentInfo">
            <v-flex xs6>
                <div v-if="videoQueue.length > 0">
                    <p class="videoTitle"> {{videoQueue[0].title}} </p>
                    <p class="videoUsername">Added By:  {{videoQueue[0].username}}</p>
                </div>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
                <br>
                Room: Room 1
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex :class="playerSize">
                <video-player :videoQueue="videoQueue" />
            </v-flex>
            <v-flex :class="queueSize">
                <video-queue :videoQueue="videoQueue" />
            </v-flex>
            <v-flex :class="playerSize">
                <v-btn color="action_delete" class="my-2 mx-3" @click="voteToSkip()" v-if="videoQueue.length > 0">
                    Vote To Skip ({{videoQueue[0].skipCounter.length}})
                </v-btn>
                <v-btn small dark fab @click="theaterMode" id="theaterModeButton" class="hidden-sm-and-down">
                    <v-icon>{{theaterModeButtonIcon}}</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import VideoPlayer from '@/components/VideoPlayer'
    import VideoQueue from '@/components/VideoQueue'

    export default {
        name: 'Chatroom',
        components: {
            VideoPlayer,
            VideoQueue
        },
        data() {
            return {
                videoQueue: [],
                socketID: '',
                playerSize: 'xs12 md9',
                queueSize: 'md3 hidden-sm-and-down slide-out-right',
                theaterModeButtonIcon: 'keyboard_arrow_right',
                theaterModeButton: false
            }
        },
        sockets: {
            getVideos: function (payload) {
                this.videoQueue = payload;
            },
            voteAdded: function (payload) {
                this.videoQueue.map(element => {
                    if (element._id === payload._id) {
                        element.skipCounter = payload.skipCounter
                    }
                })
            }
        },
        methods: {
            newRoom() {
                let payload = {
                    roomID: this.$route.params.id,
                    username: this.$store.state.user
                }
                this.$socket.emit('newRoom', payload)
            },
            theaterMode() {
                this.theaterModeButton = !this.theaterModeButton
                if (this.theaterModeButton) {
                    this.theaterModeButtonIcon = 'keyboard_arrow_left'
                    this.playerSize = 'xs12'
                    this.queueSize = 'd-none'
                } else {
                    this.theaterModeButtonIcon = 'keyboard_arrow_right'
                    this.playerSize = 'xs12 md9'
                    this.queueSize = 'md3 hidden-sm-and-down'
                }
            },
            voteToSkip() {
                console.log('adadasd');
                let payload = {
                    roomID: this.$route.params.id,
                    video: this.videoQueue[0],
                    username: this.$store.state.user
                }
                this.$socket.emit('voteToSkip', payload)
            }
        },
        mounted() {
            this.newRoom();
        },
        beforeDestroy() {
            this.$socket.emit('leaveRoom', this.$socket.id)
        }
    }
</script>

<style>
    #theaterModeButton {
        float: right;
    }
    .currentInfo p{
        margin: 0;
        padding: 0;
    }


@media only screen and (max-width: 959px) {
    .slide-out-right{
        display: block !important;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        width: 30%;
    }
}
</style>
