<template>
    <v-card class="mx-3 videoQueue">
        <v-container fluid fill-height grid-list-sm class="pa-2">
            <v-layout align-center justify-center column fill-height class="sideBar">
                <v-flex class="queueTitle">
                    <v-layout align-center justify-space-around row class="text-xs-center">
                        <v-btn flat @click="showQueue()" :class="{pressed: queueActive} ">
                            <v-icon left dark>play_arrow</v-icon>
                            Queue
                        </v-btn>
                        <v-btn flat @click="showChat()" :class="{pressed: chatActive} ">
                            <v-icon left dark>supervisor_account</v-icon>
                            Chat
                        </v-btn>
                    </v-layout>
                </v-flex>
                <v-flex id="queueList">
                    <v-flex v-for="(video,index) in videoQueue" v-bind:key="video._id" xs12 v-if="index !== 0 && queueActive">
                        <v-card class="white--text" flat>
                            <v-layout>
                                <v-flex xs2 hidden-md-and-down>
                                    <v-img :src="video.image" height="100%" contain></v-img>
                                </v-flex>
                                <v-flex xs10 md12>
                                    <v-card-text>
                                        <div>{{video.title}}</div>
                                        <div class="caption">
                                            <v-layout>
                                                <v-flex xs6 class="text-xs-left">
                                                    - {{video.channel}}
                                                </v-flex>
                                                <v-flex xs6 class="text-xs-right">
                                                    {{video.username}}
                                                </v-flex>
                                            </v-layout>
                                        </div>
                                    </v-card-text>
                                </v-flex>
                            </v-layout>
                            <v-divider light></v-divider>
                        </v-card>
                    </v-flex>
                    <v-flex v-if="chatActive">
                        <v-layout v-for="message in messages" :key="message.id">
                            <v-flex>{{message.username}}: {{message.message}}</v-flex>
                        </v-layout>
                    </v-flex>
                </v-flex>
                <v-flex>
                    <form v-on:submit.prevent="addMessage()" v-if="this.$store.state.user && this.chatActive">
                        <v-text-field label="Send a message" prepend-inner-icon="message" v-model="message" color="text_primary"></v-text-field>
                        <v-btn block round color="secondary secondary_text--text" @click="addMessage()">
                            Chat
                        </v-btn>
                    </form>
                    <form v-on:submit.prevent="addVideo()" v-if="this.$store.state.user && this.queueActive">
                        <v-text-field label="Video Link" prepend-inner-icon="play_arrow" v-model="videoLink" color="text_primary"></v-text-field>
                        <v-btn block round color="secondary secondary_text--text" @click="addVideo()">
                            Add Video
                        </v-btn>
                    </form>
                    <v-btn block round color="action_add" v-if="!this.$store.state.user" to="/login" class="secondary_text--text grad-button">
                        Sign-In Or Sign-Up Now
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: 'VideoQueue',
        props: ['videoQueue', 'messages'],
        data() {
            return {
                videoLink: '',
                message: '',
                queueActive: true,
                chatActive: false,
            }
        },
        methods: {
            addVideo() {
                if (this.videoLink) {
                    let newVideo = {
                        videoLink: this.videoLink,
                        roomID: this.$route.params.id,
                        user: this.$store.state.user
                    }
                    this.snackbar = true;
                    this.snackbarMessage = "Video Added";
                    this.$socket.emit('addVideo', newVideo);
                    this.videoLink = '';
                }
            },
            addMessage() {
                if (this.message) {
                    let newMessage = {
                        message: this.message,
                        roomID: this.$route.params.id,
                        user: this.$store.state.user
                    }
                    this.$socket.emit('addMessage', newMessage);
                    this.message = '';
                }
            },
            showChat() {
                this.chatActive = true;
                this.queueActive = false;
            },
            showQueue() {
                this.queueActive = true;
                this.chatActive = false;
            }
        },
    }
</script>

<style scoped>
    #videoQueue {
        overflow: auto;
        max-height: 70%;
    }

    .pressed{
        border-bottom: 1px solid white;
    }

    #Queue {
        border-right: 1px solid white;
        width: 50%;
    }

    #Chat {
        width: 50%;
    }

    .queueTitle {
        cursor: pointer;
    }

    .queueTitle button {
        width: 50%;
        margin: 0;
    }

    #queueList {
        flex-grow: 3500;
        overflow-y: scroll;
    }

    .queueTitle>.layout>button:first-child {
        border-right: 1px solid white;
    }

    .sideBar div {
        width: 100%;
    }

    .active {
        background: green
    }

    .word-break-all {
        word-break: break-all;
    }

    .videoQueue {
        height: 80vh;
    }

    .height-0 {
        height: 0%;
    }

    .height-5 {
        height: 5%;
    }

    .height-10 {
        height: 10%;
    }

    .height-15 {
        height: 15%;
    }

    .height-20 {
        height: 20%;
    }

    .height-60 {
        height: 60%;
    }

    .height-80 {
        height: 80%;
    }

    @media only screen and (max-width: 959px) {
        .videoQueue {
            height: 100%;
            transition: 0ms;
            margin: 0 !important;
        }
    }
</style>