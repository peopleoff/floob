<template>
  <div class="d-flex flex-column h100 w100">
    <!-- Video Search -->
    <div class="ma-2">
      <v-text-field
        flat
        hide-details
        outlined
        prepend-inner-icon="mdi-youtube"
        label="Video Link"
        full-width
      ></v-text-field>
    </div>
    <!-- Video Player -->
    <div class="ma-2 flex-grow-1" id="messages">
      <div v-for="message in messages" :key="message.id">
        <span class="primary--text">{{ message.username }}</span>
        <span>: {{ message.message }}</span>
      </div>
    </div>
    <!-- Video Actions -->
    <div class="ma-2">
      <v-text-field
        flat
        hide-details
        outlined
        prepend-inner-icon="mdi-message-outline"
        label="Say Something..."
        full-width
        v-model="message"
        @keydown.enter="addMessage"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      message: '',
      messages: []
    }
  },
  sockets: {
    newMessage: function(payload) {
      this.messages.push(payload)
    }
  },
  methods: {
    addMessage() {
      if (this.message) {
        let newMessage = {
          message: this.message,
          roomID: this.$route.params.id,
          user: this.$store.state.user
        }
        this.$socket.emit('addMessage', newMessage)
        this.message = ''
        let container = document.querySelector('#messages')
        container.scrollTop = container.scrollHeight
      }
    },
    popup() {
      window.open(
        `/chat/${this.$route.params.id}`,
        'popUpWindow',
        'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes'
      )
    }
  }
}
</script>

<style scoped>
.w100 {
  width: 100% !important;
}
#messages {
  max-height: 80vh;
  overflow-y: scroll;
}
</style>
