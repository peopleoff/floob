<template>
  <v-dialog
    v-model="showJoinModal"
    @click:outside="toggleJoinModal"
    max-width="600px"
  >
    <v-form v-on:submit.prevent="joinRoom">
      <v-card>
        <v-card-title>
          Join a room
          <v-spacer></v-spacer>
          <v-icon @click="toggleJoinModal">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="roomCode"
            label="Room Code"
            required
            filled
            outlined
            :error-messages="roomCodeErrors"

            color="legendary_mint"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="joinRoom" color="kings_purple" :loading="loading"
            >Join Room</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      roomCode: "",
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      toggleJoinModal: "modal/toggleJoinModal",
    }),
    joinRoom() {
      this.$v.$touch();
      this.loading = true;
      if (this.$v.$invalid) {
        this.loading = false;
        return false;
      }
      this.toggleJoinModal();
      this.$router.push({ path: `/room/${this.roomCode}` });
      this.roomCode = "";
    },
  },
  validations: {
    roomCode: {
      minLength: minLength(8),
      maxLength: maxLength(8),
      required,
    },
  },
  computed: {
    ...mapGetters({
      showJoinModal: "modal/showJoinModal",
    }),
    roomCodeErrors() {
      const errors = [];
      if (!this.$v.roomCode.$dirty) {
        return errors;
      }
      if (!this.$v.roomCode.minLength) {
        errors.push(
          `Must be ${this.$v.roomCode.$params.minLength.min} characters long`
        );
      }
      if (!this.$v.roomCode.maxLength) {
        errors.push(
          `Must be ${this.$v.roomCode.$params.maxLength.max} characters long`
        );
      }
      if (!this.$v.roomCode.required) {
        errors.push("A room code is required");
      }
      return errors;
    },
  },
};
</script>

<style>
</style>