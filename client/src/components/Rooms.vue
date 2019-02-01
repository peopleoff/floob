<template>
    <div id="rooms">
        <v-layout>
            <v-flex xs12>
                <v-card class="plain">
                    <v-container fluid class="pa-0">
                        <p class="display-1">
                            Public Rooms
                        </p>
                        <v-layout row wrap class="my-3">
                            <v-flex v-for="room in publicRooms" :key="room.id" xs4 class="pa-2 room-card public-room">
                                <v-card flat tile height="100%" :style="getRandomBackground()" @click="enterRoom(room)">
                                    <v-container fill-height fluid>
                                        <v-layout fill-height row>
                                            <v-flex xs12 align-end flexbox class="primary_text--text">
                                                <span class="headline">{{room.name}}</span>
                                                <br>
                                                <span class="caption">{{room.description}}</span>
                                                <div class="overlay">
                                                    <v-icon class="enter-icon">launch</v-icon>
                                                </div>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-container fluid class="pa-0">
                        <p class="display-1">
                            Private Rooms
                        </p>
                        <v-layout row wrap class="my-3">
                            <v-flex v-for="room in privateRooms" :key="room.id" xs4 class="pa-2 room-card private-room">
                                <v-card flat tile height="100%" :style="getRandomBackground()" @click="enterRoom(room)">
                                    <v-container fill-height fluid>
                                        <v-layout fill-height row>
                                            <v-flex xs12 align-end flexbox class="primary_text--text">
                                                <v-icon v-if="room.password">lock</v-icon>
                                                <span class="headline">{{room.name}}</span>
                                                <br>
                                                <span class="sub-header">{{room.description}}</span>
                                                <div class="overlay">
                                                    <v-icon class="enter-icon">lock</v-icon>
                                                </div>
                                                <div class="password-overlay" :id="room._id" v-if="room.password">
                                                    <v-form v-on:submit.prevent="checkRoomPassword()">
                                                        <v-card>
                                                            <v-card-text>
                                                                <v-container grid-list-md>
                                                                    <v-layout wrap>
                                                                        <v-flex xs12>
                                                                            <v-text-field label="Room Password" v-model="password"
                                                                                type="password"></v-text-field>
                                                                        </v-flex>
                                                                    </v-layout>
                                                                </v-container>
                                                            </v-card-text>
                                                            <v-card-actions>
                                                                <v-spacer></v-spacer>
                                                                <v-btn color="blue darken-1" flat @click="reset()">Close</v-btn>
                                                                <v-btn color="blue darken-1" flat type="submit"
                                                                    :loading="loading">Enter</v-btn>
                                                            </v-card-actions>
                                                        </v-card>
                                                    </v-form>
                                                </div>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import RoomService from '@/services/RoomService';
    import {
        mapMutations
    } from 'vuex'
    export default {
        name: 'Rooms',
        props: ['publicRooms', 'privateRooms'],
        data() {
            return {
                dialog: false,
                password: '',
                roomID: '',
                loading: false
            }
        },
        methods: {
            ...mapMutations([
                'UPDATE_SNACKBAR',
                'ADD_USER'
            ]),
            checkRoomPassword() {
                let roomCard = document.getElementById(this.roomID);
                roomCard.classList.add('show');
                this.dialog = true;
                if (this.password && !this.loading) {
                    this.loading = true;
                    let payload = {
                        roomID: this.roomID,
                        password: this.password
                    };
                    RoomService.checkRoomPassword(payload)
                        .then(result => {
                            this.loading = false;
                            if (result.data) {
                                this.$router.push({
                                    path: '/Chatroom/' + this.roomID
                                });
                            } else {
                                let newError = {
                                    error: true,
                                    type: 'error',
                                    message: 'Invalid Password'
                                }
                                this.UPDATE_SNACKBAR(newError);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            },
            getRandomBackground() {
                function getRandomColor() {
                    var lum = -0.25;
                    var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi,
                        '');
                    if (hex.length < 6) {
                        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                    }
                    var rgb = "#",
                        c, i;
                    for (i = 0; i < 3; i++) {
                        c = parseInt(hex.substr(i * 2, 2), 16);
                        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                        rgb += ("00" + c).substr(c.length);
                    }
                    return rgb;
                }

                return `background-image: linear-gradient(-90deg, ${getRandomColor()}, ${getRandomColor()};`
            },
            enterRoom(room) {
                if (room.password) {
                    this.roomID = room._id;
                    this.checkRoomPassword();
                } else {
                    this.$router.push({
                        path: '/Chatroom/' + room._id
                    });
                }
            },
            reset() {
                let roomCard = document.getElementById(this.roomID);
                roomCard.classList.remove('show');
                this.password = '';
                this.roomID = '';
                this.loading = false;
                this.dialog = false;
            }
        },
        watch: {
            dialog(val) {
                val || this.reset()
            }
        },

    }
</script>

<style scoped>
    .plain {
        background: transparent;
        border: 0;
        box-shadow: none !important;
    }

    .overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: .5s ease;
        background: #3700B3;
    }

    .password-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        display: none;
        transition: .5s ease;
        background: #3700B3;
    }

    .room-card {
        transition: all .5s;
        cursor: pointer;
        height: 200px;
        width: 200px;
    }

    .room-card:hover {
        transform: scale(1.1)
    }

    .room-card:hover .overlay {
        opacity: 0.8;
    }

    .show {
        display: block;
    }

    .display-1 {
        border-bottom: 1px solid #03DAC6;
    }

    .v-sheet {
        border-radius: 0;
    }

    .v-card__text {
        padding: 8px;
    }

    .enter-icon {
        position: absolute;
        top: 45%;
        right: 45%;
        width: 10%;
        height: 10%;
        color: #03DAC6;
    }
</style>