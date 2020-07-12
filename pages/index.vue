<template>
  <div id="landing-page">
    <section id="hero">
      <v-container>
        <span class="circle circle-1"></span>
        <span class="circle circle-2"></span>
        <span class="circle circle-3"></span>
        <span class="circle circle-4"></span>
        <v-row class="justify-center align-center banner">
          <v-col cols="12" md="6" class="z-5">
            <!-- type pausing -->
            <div>
              <vue-typed-js
                :strings="['Raid Guides', 'AMVs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', 'Lets Plays', 'Trendy Videos&nbsp;&nbsp;' ]"
                loop
                :typeSpeed="100"
                :backSpeed="100"
                :backDelay="3000"
                :startDelay="1000"
                :contentType="'html'"
                :showCursor="false"
              >
                <div class="headline white--text">
                  Share
                  <span class="typing headline"></span>
                </div>
              </vue-typed-js>
              <vue-typed-js
                :strings="['Guild.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', 'Body Pillow.', 'Friends.&nbsp;&nbsp;', 'Discord Server.' ]"
                loop
                :typeSpeed="100"
                :backSpeed="100"
                :backDelay="3000"
                :startDelay="1000"
                :contentType="'html'"
                :showCursor="false"
                style="margin-top: -30px;"
              >
                <div class="headline white--text">
                  With Your
                  <span class="typing headline"></span>
                </div>
              </vue-typed-js>
            </div>
            <!-- <vue-typed-js :strings="['First text', 'Second Text']">
              <p class="headline">Share your favorite <span class="typing"></span></p>
            </vue-typed-js>-->

            <span class="text-h6 font-weight-light">
              Create a room and share some laughs in five clicks or less!
              <br />Floob is built for sharing moments with your friends during gaming sessions or while hanging out in discord
            </span>
            <v-row class="pt-6">
              <v-col>
                <v-btn
                  v-if="$auth.user && $auth.user.room"
                  elevation="24"
                  height="50"
                  block
                  color="kings_purple"
                  class="rounded-pill"
                  nuxt
                  :to="'/room/' + $auth.user.room"
                  :loading="loading"
                  @click="loading = true"
                >Enter My Room</v-btn>
                <v-btn
                  v-else
                  elevation="24"
                  height="50"
                  block
                  color="kings_purple"
                  class="rounded-pill"
                  @click="createRoom"
                  :loading="loading"
                >Create A Room</v-btn>
              </v-col>
              <v-col>
                <v-btn
                  height="50"
                  color="royal_flue"
                  class="rounded-pill"
                  block
                  outlined
                  @click="toggleJoinModal"
                >Join A Room</v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" class="d-none d-md-block z-5">
            <div>
              <object type="image/svg+xml" :data="require('~/assets/images/share.svg')">
                <img :src="require('~/assets/images/share.svg')" />
              </object>
            </div>
          </v-col>
        </v-row>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#432b5e"
            fill-opacity="1"
            d="M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,181.3C672,192,768,192,864,165.3C960,139,1056,85,1152,53.3C1248,21,1344,11,1392,5.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </v-container>
    </section>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import RoomService from "@/services/RoomService";

export default {
  data() {
    return {
      loading: false
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
        this.loading = true;
        RoomService.register({
          user: this.$auth.user.id
        })
          .then(({ data }) => {
            this.loading = false;
            this.$router.push("/room/" + data.room);
            this.$auth.user.room = data.room;
          })
          .catch(error => {
            this.loading = false;
            console.error(error);
          });
      }
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
  background: #662d91;
  position: relative;
}

#hero svg {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 1;
}

#hero .headline {
  font-size: 3rem !important;
  font-weight: bold;
  line-height: 6rem;
  letter-spacing: -0.015625em !important;
  font-family: "Roboto", sans-serif !important;
}

.circle {
  height: 80px;
  width: 80px;
  background: rgb(156, 186, 239, 0.25);
  border-radius: 50%;
  position: absolute;
  transition: all 1s;
  z-index: 1;
}

.circle:hover {
  transition: all 1s;
  transform: scale(1.5);
}

#hero .circle-1 {
  height: 100px;
  width: 100px;
  top: 25%;
  right: 89%;
}
#hero .circle-2 {
  height: 200px;
  width: 200px;
  top: 11%;
  right: 17%;
}
#hero .circle-3 {
  height: 100px;
  width: 100px;
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

.img-md {
  max-width: 600px;
  margin: 0 auto;
}

#features {
  background-color: #432b5e;
  padding-bottom: 50px;
}

@media (max-width: 960px) {
  .vr {
    border-right: none;
  }
}
</style>
