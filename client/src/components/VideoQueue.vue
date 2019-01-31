<template>
    <v-card class="mx-3 videoQueue">
        <v-card-title class="queueTitle pa-2">
            <v-layout align-center justify-space-around class="text-xs-center">
                <!-- <span id="Queue" :class="{active: queueActive}">
                    Queue
                </span> -->
                <v-btn flat @click="showQueue()">
                    <v-icon left dark>play_arrow</v-icon>
                    Queue
                </v-btn>
                <v-btn flat @click="showChat()">
                    <v-icon left dark>supervisor_account</v-icon>
                    Chat
                </v-btn>
                <!-- <span id="Chat">
                    Chat
                </span> -->
            </v-layout>
        </v-card-title>
        <v-container fluid fill-height grid-list-sm class="pa-2" id="videoQueue">
            <v-layout row wrap>
                <!-- eslint-disable-next-line -->
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
                    <v-card class="white--text word-break-all" flat>
                        <v-card-text class="pa-2">
                            LegendarySoviet: asdadasdasdasdasdas
                        </v-card-text>
                        <v-card-text class="pa-2">
                            asdad
                        </v-card-text>
                        <v-card-text class="pa-2">
                            asdad
                        </v-card-text>
                        <v-card-text class="pa-2">
                            asdad
                        </v-card-text>
                        <v-card-text class="pa-2">
                            asdad
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fluid class="px-2" v-if="this.$store.state.user && this.queueActive">
            <v-layout>
                <v-flex xs12 align-self-end>
                    <form v-on:submit.prevent="addVideo()">
                        <v-text-field label="Video Link" prepend-inner-icon="play_arrow" v-model="videoLink" color="text_primary"></v-text-field>
                        <v-btn block round color="action_add" @click="addVideo()">
                            Add Video
                        </v-btn>
                    </form>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fluid class="px-2" v-if="this.$store.state.user && this.chatActive">
            <v-layout>
                <v-flex xs12 align-self-end>
                    <form v-on:submit.prevent="addMessage()">
                        <v-text-field label="Send a message" prepend-inner-icon="message" v-model="message" color="text_primary"></v-text-field>
                        <v-btn block round color="action_add" @click="addMessage()">
                            Chat
                        </v-btn>
                    </form>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fluid class="px-2" v-if="!this.$store.state.user">
            <v-layout>
                <v-flex xs12 align-self-end>
                    <v-btn block round color="action_add" @click="addMessage()">
                        Sign-in Or sign-Up now!
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <v-snackbar v-model="snackbar" bottom color="success">
            {{snackbarMessage}}
            <v-icon @click="snackbar = false">close</v-icon>
        </v-snackbar>
    </v-card>
</template>

<script>
    export default {
        name: 'VideoQueue',
        props: ['videoQueue'],
        data() {
            return {
                videoLink: '',
                message: '',
                queueActive: true,
                chatActive: false,
                snackbar: false,
                snackbarMessage: ' ',
                success: false
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
            showQueue(){
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

    #Queue {
        border-right: 1px solid white;
        width: 50%;
    }

    #Chat {
        width: 50%;
    }

    .queueTitle {
        border-bottom: 1px solid white;
        cursor: pointer;
    }

    .queueTitle button {
        width: 50%;
        margin: 0;
    }

    .queueTitle>.layout>button:first-child {
        border-right: 1px solid white;
    }

    .active {
        background: green
    }

    .word-break-all {
        word-break: break-all;
    }
    .videoQueue{
        height: 80vh;
    }
    @media only screen and (max-width: 959px) {
    .videoQueue{
        height: 100%;
        transition: 0ms;
        margin: 0 !important;
    }
}
</style>