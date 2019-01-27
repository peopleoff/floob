<template>
    <v-card height="80vh" class="mx-3">
        <v-container fluid fill-height grid-list-sm class="pa-2" id="videoQueue">
            <v-layout row wrap>
                <!-- eslint-disable-next-line -->
                <v-flex v-for="(video,index) in videoQueue" v-bind:key="video._id" xs12 v-if="index !== 0">
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
            </v-layout>
        </v-container>
        <v-container fluid class="px-2">
            <v-layout>
                <v-flex xs12 align-self-end>
                    <v-text-field label="Video Link" prepend-inner-icon="play_arrow" v-model="videoLink"></v-text-field>
                    <v-btn block color="action_add" @click="addVideo()">
                        Add Video
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
                        username: this.$store.state.user.username
                    }
                    this.snackbar = true;
                    this.snackbarMessage = "Video Added";
                    this.$socket.emit('addVideo', newVideo);
                    this.videoLink = '';
                }
            }
        },
    }
</script>

<style scoped>
    #videoQueue {
        overflow: auto;
        max-height: 80%;
    }
</style>