<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="50%">
      <v-card>
        <v-card-title class="headline">
          Welcome to Your One Night Room!
        </v-card-title>
        <v-card-text>
          <span class="subtitle-1 font-weight-bold px-2">
            Invite Others to Your room
          </span>
          <v-text-field
            outlined
            append-icon="mdi-content-copy"
            @click:append="copyLink"
            id="inviteLink"
            :value="'floob.gg' + this.$route.fullPath"
          ></v-text-field>
          <span class="title">
              Welcome to Your One Night Room!
          </span>
          <v-list flat>
            <v-list-item class="px-0">
              <v-list-item-content>
                <v-list-item-title>1. Share the link with your friends to begin watching together</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="px-0">
              <v-list-item-content>
                <v-list-item-title>2. Search for youtube videos using the built in search bar or add the video URL to the queue</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="px-0">
              <v-list-item-content>
                <v-list-item-title>3. All one night rooms will be deleted at 6:00am EST</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="px-0">
              <v-list-item-content>
                <v-list-item-title>4. If you wish to keep your room for longer than that, change the default room name.</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary" outlined @click="dialog = false">
            Thank You
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data: () => ({
    dialog: true
  }),
  methods: {
    ...mapMutations(['UPDATE_SNACKBAR']),
    close: function(event) {
      this.$emit('closeDialog')
    },
    copyLink() {
      let textToCopy = document.getElementById('inviteLink')
      textToCopy.select()
      document.execCommand('copy')
      this.UPDATE_SNACKBAR({
        type: 'info',
        message: 'Link Copied'
      })
    }
  },
}
</script>

<style>
.v-icon.v-icon.v-icon--link{
  color: #00bcd4 !important
}
</style>
