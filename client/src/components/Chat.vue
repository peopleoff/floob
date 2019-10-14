<template>
  <div class="d-flex flex-column h100">
    <!-- Video Search -->
    <div class="ma-2">
      <v-text-field
        flat
        hide-details
        outlined
        prepend-inner-icon="mdi-magnify"
        label="Video Link"
        full-width
      ></v-text-field>
    </div>
    <!-- Video Player -->
    <div class="ma-2 flex-grow-1">
      <v-sheet width="100%" height="100%">
        <div v-for="message in messages">
          {{message.username}} : {{message.message}}
        </div>
      </v-sheet>
    </div>
    <!-- Video Actions -->
    <div class="ma-2">
      <v-text-field
        flat
        hide-details
        outlined
        prepend-inner-icon="mdi-magnify"
        label="Say Something..."
        full-width
      ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      messages: [
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        },
        {
          message: 'Title',
          username: 'Username'
        }
      ]
    }
  }
}
</script>

<style scoped>
.w100 {
  width: 100% !important;
}
</style>
