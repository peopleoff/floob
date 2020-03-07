<template>
  <div id="landing-page">
    <section id="hero">
      <v-container fluid>
        <v-row class="pa-12 justify-center align-center h100">
          <v-col sm="6">
            <h3 class="display-3 font-weight-medium pb-9">
              The best way to watch videos with your friends when you're too scared to go outside
            </h3>
            <v-btn color="legendary_mint" id="cta" nuxt to="/room/25">Create A Room</v-btn>
          </v-col>
          <v-col sm="6">
            <!-- <v-img :src="require('~/assets/images/landing.svg')"></v-img> -->
            <object type="image/svg+xml" :data="require('~/assets/images/landing.svg')">

            <img :src="require('~/assets/images/landing.svg')" />

            </object>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="explain">
      <v-container class="topNav pl-12">
        <v-row class="pb-5">
          <v-col sm="3">
            <v-img src="https://via.placeholder.com/1024x683"></v-img>
          </v-col>
          <v-col sm="6">
            <h1 class="display-2">
              <v-icon x-large>mdi-home</v-icon>
              Look at this neat gif of floob working for you!
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
            <v-sheet height="300" class="pa-5">
              <div class="d-flex flex-column justify-space-around">
                <div>
                  <v-icon>
                    mid-play
                  </v-icon>
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
                  <a href="">Start Here</a>
                </div>
              </div>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet height="300" color="white" class="black--text pa-5">
              <div class="d-flex flex-column justify-space-around">
                <div>
                  <v-icon>
                    mid-play
                  </v-icon>
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
                  <a href="">Start Here</a>
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>


<style>
#cta{
  color: white;
  width: 50%;
  height: 50px;
}
section#hero {
  background-color: #634fd6;
  height: 100vh;
  position: relative;
  padding-top: 15vh;
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

.topNav {
  position: absolute;
  top: 25%;
}


.floob-display {
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 50%;
  height: 50%;
}
</style>
