<template>
    <div id="rooms">
        <v-layout row>
            <v-flex xs4 offset-xs1>
                <v-card>
                    <v-toolbar color="primary">
                        <v-toolbar-title>Community Rooms</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>search</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>view_module</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-list two-line>
                        <v-list-tile v-for="room in rooms" :key="room.id">
                            <v-icon v-if="room.password" color="grey lighten-1" class="pr-2">lock</v-icon>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ room.name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ room.description }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action-text>
                                Current Users: {{room.currentUsers.length}}
                            </v-list-tile-action-text>
                            <v-list-tile-action>
                                <v-btn icon ripple @click="enterRoom(room)">
                                    <v-icon color="grey lighten-1">exit_to_app</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
            <v-flex xs4 offset-xs1>
                <v-card>
                    <v-toolbar color="primary">
                        <v-toolbar-title>Floob Rooms</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>search</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>view_module</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-list two-line>
                        <v-list-tile v-for="room in rooms" :key="room.id">
                            <v-icon v-if="room.password" color="grey lighten-1" class="pr-2">lock</v-icon>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ room.name }}</v-list-tile-title>
                                <v-list-tile-sub-title>{{ room.description }}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action-text>
                                Current Users: {{room.currentUsers.length}}
                            </v-list-tile-action-text>
                            <v-list-tile-action>
                                <v-btn icon ripple @click="enterRoom(room)">
                                    <v-icon color="grey lighten-1">exit_to_app</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row justify-center>
            <v-dialog v-model="dialog" max-width="600px">
                <v-form v-on:submit.prevent="checkRoomPassword()">
                    <v-card>
                        <v-card-title>
                            <span class="headline">User Profile</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <v-text-field label="Room Password" v-model="password" type="password"></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat type="submit" :loading="loading">Enter</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-dialog>
        </v-layout>
    </div>
</template>
<script>
    import RoomService from '@/services/RoomService';
    export default {
        name: 'Rooms',
        props: ['rooms'],
        data() {
            return {
                dialog: false,
                password: '',
                roomID: '',
                loading: false
            }
        },
        methods: {
            checkRoomPassword() {
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
                                console.log('error');
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
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
                this.password = '',
                    this.roomID = '',
                    this.loading = false,
                    this.dialog = false
            }
        },
        watch: {
            dialog(val) {
                val || this.reset()
            }
        },

    }
</script>

<style>

</style>