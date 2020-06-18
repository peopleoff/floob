<template>
  <div id="landing-page">
    <section id="hero">
      <div class="block">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <v-container fluid>
        <v-row class="pa-12 justify-center align-center banner">
          <v-col class="d-none d-sm-block">
            <!-- <v-img :src="require('~/assets/images/landing.svg')"></v-img> -->
            <object type="image/svg+xml" :data="require('~/assets/images/landing.svg')">
              <img :src="require('~/assets/images/landing.svg')" />
            </object>
          </v-col>
          <v-col>
            <p class="display-1">Share your favorite moments</p>
            <p class="display-2 font-weight-bold">In a Floob Room</p>
            <v-row>
              <v-col>
                <v-btn elevation="24" height="50" block @click="createRoom()">Create A Room</v-btn>
              </v-col>
              <v-col>
                <v-btn height="50" color="#272727" block outlined @click="joinRoom()">Join A Room</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="explain">
      <v-container class="pl-12">
        <v-row class="pb-5">
          <v-col sm="3">
            <v-img src="https://via.placeholder.com/1024x683"></v-img>
          </v-col>
          <v-col sm="6">
            <h1 class="display-2">
              <v-icon x-large>mdi-home</v-icon>Look at this neat gif of floob working for you!
            </h1>
            <h3 class="headline">
              Officia enim occaecat voluptate qui duis amet in pariatur
              excepteur. Dolore magna ipsum minim ut. Nisi deserunt aliquip
              laborum anim esse enim laboris adipisicing exercitation nulla.
            </h3>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="sharing">
      <v-container class="pl-12">
        <v-row align-content="center" justify="center" class="text-center">
          <v-col>
            <v-sheet class="pa-5">
              <div class="d-flex flex-column justify-space-around">
                <div>
                  <v-icon>mid-play</v-icon>
                  <h1>Test</h1>
                </div>
                <div>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Molestias quasi ratione sint, dicta illo aut odio vitae
                  facilis magni autem neque qui doloribus natus ipsa laudantium,
                  ex saepe voluptatem omnis! Lorem ipsum dolor sit amet
                  consectetur, adipisicing elit. Eveniet doloremque in quo ad
                  voluptas. Ipsa sequi doloremque numquam non praesentium dolore
                  quaerat molestias? Recusandae nesciunt quos minus architecto
                  nostrum repellat?
                </div>
                <div>
                  <a href>Start Here</a>
                </div>
              </div>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet color="white" class="black--text pa-5">
              <div class="d-flex flex-column justify-space-around">
                <div>
                  <v-icon>mid-play</v-icon>
                  <h1>Test</h1>
                </div>
                <div>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Molestias quasi ratione sint, dicta illo aut odio vitae
                  facilis magni autem neque qui doloribus natus ipsa laudantium,
                  ex saepe voluptatem omnis! Lorem ipsum dolor sit amet
                  consectetur, adipisicing elit. Eveniet doloremque in quo ad
                  voluptas. Ipsa sequi doloremque numquam non praesentium dolore
                  quaerat molestias? Recusandae nesciunt quos minus architecto
                  nostrum repellat?
                </div>
                <div>
                  <a href>Start Here</a>
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <JoinRoom v-bind:joinDialog="joinDialog" />
  </div>
</template>


<script>
import { mapActions } from "vuex";
import RoomService from "@/services/RoomService";
import JoinRoom from "@/components/JoinRoom";

export default {
  components: {
    JoinRoom
  },
  data() {
    return {
      joinDialog: false
    };
  },
  methods: {
    ...mapActions({
      toggleForm: "user/toggleForm"
    }),
    createRoom() {
      //If user is not logged in redirect to login page
      if (!this.$auth.loggedIn) {
        this.toggleForm();
      } else {
        RoomService.register(this.$auth.user)
          .then(({ data }) => {
            this.$router.push("/room/" + data.room);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    joinRoom() {
      this.joinDialog = !this.joinDialog;
    }
  },
};
</script>


<style>
section#hero {
  height: 100vh;
  position: relative;
  padding-top: 15vh;
  background-color: #424242;
}

section#explain {
  background-image: linear-gradient(
    170deg,
    #424242 70%,
    #bdbdbd calc(70% + 2px)
  );
  height: 100vh;
  position: relative;
}

section#sharing {
  background: #bdbdbd;
  height: 50vh;
  position: relative;
}

.banner > div {
  z-index: 1;
}
/* STRIPE BG */
.block {
  width: 100%;
  height: 100vh;
  background: linear-gradient(150deg, #634fd6 15%, #05d5ff 70%, #a6ffcb 94%);
  transform: skewY(-10deg);
  transform-origin: 0;
  position: absolute;
  top: -65px;
}
.block span {
  height: 190px;
  position: absolute;
}
.block span:nth-child(1) {
  width: 33.3%;
  width: calc(100% / 3);
  left: -16.66666%;
  left: calc(calc(calc(100% / 3) / 2) * -1);
  background: #634fd6;
}
.block span:nth-child(2) {
  width: 33.33333%;
  width: calc(100% / 3);
  top: 0;
  left: 16.66666%;
  left: calc(calc(100% / 3) / 2);
  right: auto;
  background: #2f64eb;
}
.block span:nth-child(3) {
  width: 33.33333%;
  width: calc(100% / 3);
  left: 49.99999%;
  left: calc(calc(calc(100% / 3) / 2) + calc(100% / 3));
  bottom: auto;
  background: #00ccc2;
}
.block span:nth-child(4) {
  width: 33.33333%;
  width: calc(100% / 3);
  bottom: 0;
  background: #00ccc2;
}
</style>
