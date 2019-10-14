<template>
  <div id="rooms">
    <v-layout>
      <v-flex xs12>
        <v-card class="plain">
          <v-container fluid class="pa-0">
            <p class="display-1">Public Rooms</p>
            <v-layout row wrap class="my-3">
              <v-flex
                v-for="room in publicRooms"
                :key="room.id"
                sm4
                class="pa-2 room-card public-room"
              >
                <v-card flat tile height="100%" @click="enterRoom(room)">
                  <v-container fill-height fluid>
                    <v-layout fill-height row>
                      <v-flex xs12 align-end flexbox class="primary_text--text">
                        <span class="headline">{{room.name}}</span>
                        <br />
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
            <p class="display-1">Private Rooms</p>
            <v-layout row wrap class="my-3">
              <v-flex
                v-for="room in privateRooms"
                :key="room.id"
                sm4
                class="pa-2 room-card private-room"
              >
                <v-card flat tile height="100%" @click="enterRoom(room)">
                  <v-container fill-height fluid>
                    <v-layout fill-height row>
                      <v-flex xs12 align-end flexbox class="primary_text--text">
                        <v-icon v-if="room.password">lock</v-icon>
                        <span class="headline">{{room.name}}</span>
                        <br />
                        <span class="sub-header">{{room.description}}</span>
                        <div class="overlay">
                          <v-icon class="enter-icon">lock</v-icon>
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
    <v-dialog v-if="selectedRoom" v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>{{this.selectedRoom.name}}</v-card-title>
        <v-card-text>
          <v-text-field type="text" label="Enter Room Password" v-model="password" ref="search"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="checkRoomPassword" :loading="loading">Enter</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import RoomService from "@/services/RoomService";
import Alert from "@/components/Alert";

import { mapMutations } from "vuex";
export default {
  name: "Rooms",
  props: ["publicRooms", "privateRooms"],
  data() {
    return {
      dialog: false,
      password: "",
      selectedRoom: null,
      loading: false
    };
  },
  methods: {
    ...mapMutations(["UPDATE_SNACKBAR", "ADD_USER"]),
    checkRoomPassword() {
      if (this.password && !this.loading) {
        this.loading = true;
        let payload = {
          roomID: this.selectedRoom._id,
          password: this.password
        };
        RoomService.checkRoomPassword(payload)
          .then(result => {
            this.loading = false;
            if (result.data) {
              this.$router.push({
                path: "/Chatroom/" + this.roomID
              });
            } else {
              let newError = {
                error: true,
                type: "error",
                message: "Invalid Password"
              };
              this.UPDATE_SNACKBAR(newError);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        let newError = {
          error: true,
          type: "error",
          message: "Invalid Password"
        };
        this.UPDATE_SNACKBAR(newError);
      }
    },
    enterRoom(room) {
      if (room.password) {
        this.selectedRoom = room;
        this.dialog = true;
        this.$nextTick(() => this.$refs.search.$el.focus());
      } else {
        this.$router.push({
          path: "/Theater/" + room._id
        });
      }
    },
    reset() {
      this.password = "";
      this.selectedRoom = "";
      this.loading = false;
      this.dialog = false;
    }
  },
  watch: {
    dialog(val) {
      val || this.reset();
    }
  }
};
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
  transition: 0.5s ease;
  background: #3700b3;
}

.room-card {
  transition: all 0.5s;
  cursor: pointer;
  height: 200px;
  width: 200px;
}

.room-card:hover {
  transform: scale(1.1);
}

.room-card:hover .overlay {
  opacity: 0.8;
}

.show {
  display: block;
}

.display-1 {
  border-bottom: 1px solid #03dac6;
}

.enter-icon {
  position: absolute;
  top: 45%;
  right: 45%;
  width: 10%;
  height: 10%;
  color: #03dac6;
}
</style>