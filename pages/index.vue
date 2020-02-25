<template>
  <div id="landing-page">
    <section id="hero">
      <v-container fluid class="header pl-12">
        <v-row class="pb-5">
          <v-col>
            <h1 class="display-2">Floob Together</h1>
          </v-col>
        </v-row>
        <v-row class="pb-12">
          <v-col>
            <h3 class="headline">
              Floob is a platform where you watch videos with your friends no
              matter where you are.
            </h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="legendary_mint mr-4">Start Now</v-btn>
            <v-btn color="legendary_mint" outlined>Share</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-img src="https://via.placeholder.com/1024x683" class="floob-display"></v-img>
    </section>
    <section id="explain">
      <v-container fluid class="header pl-12">
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
              Officia enim occaecat voluptate qui duis amet in pariatur excepteur. Dolore magna ipsum minim ut. Nisi deserunt aliquip laborum anim esse enim laboris adipisicing exercitation nulla.
            </h3>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section id="sharing">
      <v-container fluid class="header pl-12">
        <v-row align-content="center" justify="center" class="text-center">
          <v-col>
            <v-icon>mdi-share</v-icon>
            How to share videos!
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            Aliquip aliqua est adipisicing excepteur pariatur sunt dolor sit consectetur sunt aliquip sint. Id irure cillum nisi aliquip esse elit dolor. Enim nisi nostrud enim in. Cillum ex veniam cillum esse do irure fugiat pariatur et quis do ea. Incididunt proident ad adipisicing tempor et ex ex et qui aliqua cillum consequat ipsum nostrud. Commodo irure est duis anim exercitation.
            Aliquip aliqua est adipisicing excepteur pariatur sunt dolor sit consectetur sunt aliquip sint. Id irure cillum nisi aliquip esse elit dolor. Enim nisi nostrud enim in. Cillum ex veniam cillum esse do irure fugiat pariatur et quis do ea. Incididunt proident ad adipisicing tempor et ex ex et qui aliqua cillum consequat ipsum nostrud. Commodo irure est duis anim exercitation.
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  layout: "landing"
};
</script>

<style>
section#hero {
  background-image: linear-gradient(170deg, #634FD6 70%, #424242 calc(70% + 2px));
  height: 100vh;
  position: relative;
}

section#explain{
  background-image: linear-gradient(170deg, #424242 70%, #BDBDBD calc(70% + 2px));
  height: 100vh;
  position: relative;
}

section#sharing{
  background-image: linear-gradient(170deg, #BDBDBD 70%, #634FD6 calc(70% + 2px));
  height: 100vh;
  position: relative;
}

.header {
  position: absolute;
  top: 25%;
}

.divider {
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 40vh;
}

.floob-display {
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 50%;
  height: 50%;
}
</style>
