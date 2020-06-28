<template>
  <div id="landing-page">
    <section id="hero">
      <v-container>
        <v-row class="justify-center align-center banner">
          <v-col class="d-none d-sm-block">
            <!-- <v-img :src="require('~/assets/images/landing.svg')"></v-img> -->
            <object type="image/svg+xml" :data="require('~/assets/images/landing.svg')">
              <img :src="require('~/assets/images/landing.svg')" />
            </object>
          </v-col>
          <v-col>
            <p class="headline text-h4">Share your favorite moments</p>
            <p class="text-subtitle-1">Create a room and share moments in five clicks or less!</p>
            <v-row>
              <v-col>
                <v-btn
                  v-if="$auth.user && $auth.user.room"
                  elevation="24"
                  height="50"
                  block
                  nuxt
                  :to="'/room/' + $auth.user.room"
                >Join My Room</v-btn>
                <v-btn v-else elevation="24" height="50" block @click="createRoom">Create A Room</v-btn>
              </v-col>
              <v-col>
                <v-btn
                  height="50"
                  color="legendary_mint"
                  block
                  outlined
                  @click="toggleJoinModal"
                >Join A Room</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
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
