<template>
  <!-- <div class="h100">
    <div
      class="pa-2 align-stretch hero"
      :style="{
        backgroundImage:
          'url(\'' + require('@/assets/images/landing.png') + '\')'
      }"
    >
      <v-row align="start" justify="center" class="flex-grow-1">
        <v-col class="text-center" cols="12">
          <v-img
            :src="require('@/assets/images/logo-text.svg')"
            id="logo"
          ></v-img>
          <h4 class="subheading">
            Floob gives gamers a place to chill while sharing videos that
            everyone can watch at the same time. Our mission is to provide
            people a place to share their favorite content with the communities
            they love and to connect with communities not yet explored.
          </h4>
          <v-btn class="ma-2" color="secondary" to="/Login">
            Log In
          </v-btn>
          <v-btn class="ma-2" outlined to="/rooms">
            Discover Rooms
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div class="pa-2 align-stretch" style="height: 500px;">
      <div class="row info-row">
        <div class="col">
          <v-card class="mx-auto" max-width="344" outlined light>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Step 1</div>
                <v-list-item-title class="headline mb-1"
                  >Fuck Bitches</v-list-item-title
                >
                <v-list-item-subtitle
                  >Greyhound divisely hello coldly
                  fonwderfully</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
                src="https://img1.wsimg.com/isteam/ip/b381901a-1744-4acd-a525-faef61ddb05c/logo/31ab3319-451b-42a8-b096-add7a8944fbe.png/:/rs=h:320"
              ></v-list-item-avatar>
            </v-list-item>
          </v-card>
        </div>
        <div class="col">
          <v-card class="mx-auto" max-width="344" outlined light>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Step 2</div>
                <v-list-item-title class="headline mb-1"
                  >????</v-list-item-title
                >
                <v-list-item-subtitle
                  >Greyhound divisely hello coldly
                  fonwderfully</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              ></v-list-item-avatar>
            </v-list-item>
          </v-card>
        </div>
        <div class="col">
          <v-card class="mx-auto" max-width="344" outlined light>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Step 3</div>
                <v-list-item-title class="headline mb-1"
                  >Get Money</v-list-item-title
                >
                <v-list-item-subtitle
                  >Greyhound divisely hello coldly
                  fonwderfully</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              ></v-list-item-avatar>
            </v-list-item>
          </v-card>
        </div>
      </div>
    </div>
    <Footer />
  </div> -->
  <v-container fluid>
    <section
      class="d-flex flex-column h100"
      :style="{
        backgroundImage:
          'url(\'' + require('@/assets/images/landing.png') + '\')'
      }"
    >
      <v-row align="start" justify="center" class="flex-grow-1">
        <v-col class="text-center" cols="12">
          <v-img
            :src="require('@/assets/images/logo-text.svg')"
            id="logo"
          ></v-img>
          <h4 class="subheading">
            Floob gives gamers a place to chill while sharing videos that
            everyone can watch at the same time. Our mission is to provide
            people a place to share their favorite content with the communities
            they love and to connect with communities not yet explored.
          </h4>
          <v-btn class="ma-2" color="secondary" to="/Login">
            Log In
          </v-btn>
          <v-btn class="ma-2" outlined to="/rooms">
            Discover Rooms
          </v-btn>
        </v-col>
      </v-row>
      <Footer />
    </section>
  </v-container>
</template>

<script>
import RoomCard from '@/components/RoomCards'
import RoomService from '@/services/RoomService.js'
import Footer from '../components/includes/Footer'
import { mapMutations } from 'vuex'

export default {
  name: 'Index',
  components: {
    RoomCard,
    Footer
  },
  data() {
    return {
      loading: true,
      publicRooms: [],
      favoriteRooms: []
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_LOADING']),
    createRoom() {
      let newRoom = {
        name: 'Test Name 23',
        description: 'Test Description 23',
        nsfw: 1,
        userID: 1,
        roomType: 1
      }
      RoomService.register(newRoom)
        .then(result => {
          console.log(result)
          let roomID = result.data.room
          this.$router.push({
            name: 'room',
            params: { id: roomID, createdRoom: true }
          })
          // this.$router.push({
          //   path: '/room/' + result.data.room,
          //   params: { newRoom: true }
          // })
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
#logo {
  height: 100%;
  width: 50%;
  margin: 25px auto;
}
.info-row {
  margin-top: -80px;
}
/* .container {
  padding: 0;
} */
.container {
  height: 100%;
  padding: 0;
}
.subheading {
  width: 50%;
  margin: 0 auto;
}
.hero {
  height: 70vh;
  background-position: center;
  background-repeat: no-repeat;
  background-position-y: center;
}
</style>
