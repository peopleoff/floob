<template>
  <v-row justify="center">
    <v-dialog v-model="joinDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Join Room</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field v-model="roomCode" label="Room Code" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="joinRoom">Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    joinDialog: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
      return {
          roomCode: null
      }
  },
  methods:{
      joinRoom(){
          this.$router.push({ path: `/room/${this.roomCode}` })
      }
  }
};
</script>