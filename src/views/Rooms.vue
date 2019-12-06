<template>
  <v-container>
    <section class="text-center py-10">
      <h1 class="mb-5">Find new communities!</h1>
      <v-text-field
        flat
        hide-details
        outlined
        prepend-inner-icon="mdi-magnify"
        label="Search Rooms"
        id="videoBar"
        color="secondary"
        v-model="search"
      ></v-text-field>
    </section>
    <section class="py-6">
      <h1 class="header">Featured Rooms</h1>
      <v-carousel>
        <v-carousel-item
          v-for="(room, i) in sponsoredRooms"
          v-if="room.videos.length !== 0"
          :key="room.id"
          :to="'room/' + room.id"
        >
          <v-img
            class="white--text align-end"
            height="100%"
            aspect-ratio="1.77779"
            :src="room.videos[0].image"
          >
            <div class="pa-4 ma-4 imageRoomName">{{ room.name }}</div>
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </section>
    <section class="py-6" v-if="recommendedRooms.length > 0">
      <h1 class="header">Recommended Rooms</h1>
      <v-row v-if="fileretedList.length > 0">
        <v-col
          v-for="room in recommendedRooms"
          :key="room.id"
          sm="6"
          md="4"
          lg="3"
        >
          <RoomCard :room="room" @toggledRoom="getRooms" />
        </v-col>
      </v-row>
    </section>
    <section class="py-6" v-if="publicRooms.length > 0">
      <h1 class="header">Rooms</h1>
      <v-row v-if="fileretedList.length > 0">
        <v-col
          v-for="room in fileretedList"
          :key="room.id"
          sm="6"
          md="4"
          lg="3"
        >
          <RoomCard :room="room" @toggledRoom="getRooms" />
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script>
import RoomCard from '@/components/RoomCards'
import RoomService from '@/services/RoomService.js'

import { mapMutations } from 'vuex'

export default {
  name: 'Index',
  components: {
    RoomCard
  },
  data() {
    return {
      search: '',
      publicRooms: [],
      sponsoredRooms: [],
      recommendedRooms: []
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_LOADING']),
    getRooms() {
      let user = null
      this.publicRooms = []
      this.favoriteRooms = []
      if (this.$store.state.user) {
        user = this.$store.state.user.id
      }
      RoomService.getAll({
        user: user
      })
        .then(response => {
          this.publicRooms = response.data.publicRooms
          this.sponsoredRooms = response.data.sponsoredRooms
          this.recommendedRooms = response.data.recommendedRooms
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  computed: {
    fileretedList() {
      return this.publicRooms.filter(room => {
        return room.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted() {
    this.getRooms()
  }
}
</script>

<style>
.header {
  border-bottom: 1px solid #eee;
}
.v-image__image--cover {
  transition: all 0.5s ease;
}
.v-item-group:hover .v-image__image--cover {
  transition: all 0.5s ease;
  transform: scale(1.25);
}
.imageRoomName {
  background: rgb(0, 0, 0, 0.75);
  width: fit-content;
  padding: 20px;
  font-size: 2rem;
}
</style>
