<template>
  <div id="landing-page">
    <section id="hero">
      <v-container>
        <span class="circle circle-1"></span>
        <span class="circle circle-2"></span>
        <span class="circle circle-3"></span>
        <span class="circle circle-4"></span>
        <v-row class="align-center banner">
          <v-col md="7">
            <p class="headline">Share your favorite moments</p>
            <span class="text-h6 font-weight-light">
              Create a room and share some laughs in five clicks or less!
              <br />Floob is built for sharing videos with your friends during gaming sessions or while hanging out in discord
            </span>
            <v-row>
              <v-col>
                <v-btn
                  v-if="$auth.user && $auth.user.room"
                  elevation="24"
                  height="50"
                  block
                  class="rounded-lg"
                  nuxt
                  :to="'/room/' + $auth.user.room"
                >Enter My Room</v-btn>
                <v-btn v-else elevation="24" height="50" block @click="createRoom">Create A Room</v-btn>
              </v-col>
              <v-col>
                <v-btn
                  height="50"
                  color="legendary_mint"
                  class="rounded-lg"
                  block
                  outlined
                  @click="toggleJoinModal"
                >Join A Room</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div id="sync-graphic" class="d-none d-sm-block">
          <object type="image/svg+xml" :data="require('~/assets/images/landing.svg')">
            <img :src="require('~/assets/images/landing.svg')" />
          </object>
        </div>
      </v-container>
    </section>
    <section id="explain">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" order="2" order-md="1">
            <p class="headline text-h4">No more having to count down to press play</p>
            <p
              class="text-subtitle-1"
            >Our rooms auto sync your videos to insure that everyone i son the same page, no more "3,2,1 Play". Paired with the ability to add videos into a queue you can sahre and watch videos withyoiur friends.</p>
          </v-col>
          <v-col cols="12" md="6" order="1" order-md="2">
            <object type="image/svg+xml" :data="require('~/assets/images/watch_together.svg')">
              <img :src="require('~/assets/images/watch_together.svg')" />
            </object>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="features">
      <v-container>
        <v-row>
          <v-col cols="12" md="6" class="vr">
            <v-img
              :src="require('~/assets/images/heart_sync.svg')"
              max-width="200px"
              class="mx-auto ma-5"
            ></v-img>
            <p class="headline text-h4">No more having to count down to press play</p>
            <p
              class="text-subtitle-1"
            >Our rooms auto sync your videos to insure that everyone i son the same page, no more "3,2,1 Play". Paired with the ability to add videos into a queue you can sahre and watch videos withyoiur friends.</p>
          </v-col>
          <v-col cols="12" md="6">
            <v-img
              :src="require('~/assets/images/heart_sync.svg')"
              max-width="200px"
              class="mx-auto ma-5"
            ></v-img>
            <p class="headline text-h4">No more having to count down to press play</p>
            <p
              class="text-subtitle-1"
            >Our rooms auto sync your videos to insure that everyone i son the same page, no more "3,2,1 Play". Paired with the ability to add videos into a queue you can sahre and watch videos withyoiur friends.</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
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
      toggleLoginModal: "modal/toggleLoginModal",
      toggleJoinModal: "modal/toggleJoinModal"
    }),
    createRoom() {
      //If user is not logged in redirect to login page
      if (!this.$auth.loggedIn) {
        this.toggleLoginModal();
      } else {
        RoomService.register({
          user: this.$auth.user.id
        })
          .then(({ data }) => {
            this.$router.push("/room/" + data.room);
            this.$auth.user.room = data.room;
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    joinRoom() {
      this.joinDialog = !this.joinDialog;
    }
  }
};
</script>


<style>
.headline {
  color: #9cbaef;
}
.subtext {
  letter-spacing: 2px;
  font-weight: 300;
}

.vr {
  border-right: 1px solid rgb(255, 255, 255, 0.25);
}

#landing-page .container,
#landing-page .row {
  height: inherit;
}

#hero {
  height: 100vh;
  background: linear-gradient(170deg, #662d91 70%, #432b5e calc(70% + 2px));
  position: relative;
}

#hero .headline {
  font-size: 5rem !important;
  font-weight: bold;
  line-height: 6rem;
  letter-spacing: -0.015625em !important;
  font-family: "Roboto", sans-serif !important;
}

#sync-graphic {
  width: 63%;
  position: absolute;
  right: -6%;
  bottom: 20%;
}
.circle {
  height: 80px;
  width: 80px;
  background: rgba(67, 43, 94, 0.5);
  border-radius: 50%;
  position: absolute;
}

#hero .circle-1 {
  top: 25%;
  right: 89%;
}
#hero .circle-2 {
  top: 11%;
  right: 17%;
}
#hero .circle-3 {
  top: 73%;
  right: 63%;
}
#hero .circle-4 {
  top: 04%;
  right: 80%;
}

#hero .col {
  z-index: 1;
}

#explain {
  height: 80vh;
  background: linear-gradient(170deg, #432b5e 70%, #6d4496 calc(70% + 2px));
}

#features {
  background: linear-gradient(170deg, #6d4496 70%, #6d4496 calc(70% + 2px));
}

@media (max-width: 960px) {
  #explain {
    background: #432b5e;
  }

  #features {
    background: #6d4496;
  }
}
</style>
