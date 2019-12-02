<template>
  <v-dialog
    v-model="dialog"
    @click:outside="close"
    max-width="600px"
    transition="dialog-bottom-transition"
  >
    <v-card v-if="room">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ room.name }} Settings - Temporary Room</v-toolbar-title>
      </v-toolbar>
      <v-list three-line subheader>
        <v-subheader>Room Information</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-model="room.name"
              :rules="nameRules"
              counter="50"
              label="Room Name"
              outlined
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-textarea
              v-model="room.description"
              label="Room Description"
              :rules="descRules"
              counter="250"
              outlined
              auto-grow
            ></v-textarea>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list three-line subheader>
        <v-subheader>Room Controls</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="room.nsfw"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mature Room</v-list-item-title>
            <v-list-item-subtitle>Enables 18+ content</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
              <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="close">Close</v-btn>
          <v-btn text @click="updateRoom">Save</v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card v-if="room">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ room.name }} Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="updateRoom">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <v-subheader>Room Information</v-subheader>
        <v-list-item>
          <v-list-item-content>
            <v-text-field
              v-model="room.name"
              :rules="nameRules"
              counter="50"
              label="Room Name"
              outlined
            ></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-textarea
              v-model="room.description"
              label="Room Description"
              :rules="descRules"
              counter="250"
              outlined
              auto-grow
            ></v-textarea>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list three-line subheader>
        <v-subheader>Room Controls</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="room.nsfw"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mature Room</v-list-item-title>
            <v-list-item-subtitle>Enables 18+ content</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog> -->
</template>

<script>
import RoomService from '@/services/RoomService'
import { mapMutations } from 'vuex'
export default {
  props: ['dialog', 'room'],
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
      nameRules: [v => v.length <= 50 || 'Max 50 characters'],
      descRules: [x => x.length <= 250 || 'Max 250 characters']
    }
  },
  methods: {
    ...mapMutations(['UPDATE_SNACKBAR']),
    close() {
      this.$emit('close')
    },
    updateRoom() {
      RoomService.updateRoom({
        room: this.room,
        user: this.$store.state.user
      })
        .then(result => {
          console.log(result)
          this.UPDATE_SNACKBAR(result.data)
        })
        .catch(error => {
          console.error(error)
        })
      this.$emit('close')
    }
  }
}
</script>
<style></style>
