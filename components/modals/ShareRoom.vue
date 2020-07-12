<template>
  <v-dialog v-model="showShareModal" @click:outside="toggleShareModal" max-width="600px">
    <v-card>
      <v-card-title>
        Share Your Room
        <v-spacer></v-spacer>
        <v-icon @click="toggleShareModal">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <p class="text-subtitle-1">Page Link</p>
        <v-text-field
          id="share-code"
          color="legendary_mint"
          class="rounded-pill"
          onkeypress="return false;"
          :value="host + '/room/' + this.room.roomUUID"
          @click:append="ShareRoom"
          append-icon="mdi-content-copy"
          outlined
        ></v-text-field>

        <!-- <p class="text-h6">Quick Links</p>
        <div class="d-flex justify-space-around">
          <div class="d-flex flex-column text-center">
            <v-btn fab text>
              <v-icon large>mdi-twitter</v-icon>
            </v-btn>
            <span class="pt-3">Twitter</span>
          </div>
          <div class="d-flex flex-column text-center">
            <v-btn fab text>
              <v-icon large>mdi-discord</v-icon>
            </v-btn>
            <span class="pt-3">Discord</span>
          </div>
          <div class="d-flex flex-column text-center">
            <v-btn fab text>
              <v-icon large>mdi-reddit</v-icon>
            </v-btn>
            <span class="pt-3">Reddit</span>
          </div>
        </div>-->
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      roomCode: "",
      host: location.host
    };
  },
  methods: {
    ...mapActions({
      toggleShareModal: "modal/toggleShareModal",
      notificationAdd: "notification/add"
    }),
    ShareRoom() {
      let copyText = document.querySelector("#share-code");
      copyText.select();
      document.execCommand("copy");
      this.notificationAdd({
        type: "success",
        message: "Link Copied!"
      });
    }
  },
  computed: {
    ...mapGetters({
      showShareModal: "modal/showShareModal"
    }),
    ...mapState({
      room: state => state.room.room
    })
  }
};
</script>

<style>
</style>