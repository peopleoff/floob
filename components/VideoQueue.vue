<template>
  <section>
    <h4>Video Queue({{ queue.length }})</h4>
    <!-- <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
        <v-card>
          <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-bookmark</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row> -->
  </section>
  <!-- <div>
    <h4>Video Queue({{ queue.length }})</h4>
    <v-row class="videoQue pb-4" dense>
      <v-col
        v-for="(video, index) in queue"
        :key="index"
        cols="2"
        class="videoImage"
      >
        <v-img :src="video.image" :height="imageHeight" aspect-ratio="1.7778"></v-img>
        <div class="overlay">
          {{video.title}}
        </div>
      </v-col>
    </v-row>
  </div> -->
</template>

<script>
export default {
  name: "videoQueue",
  props: ["videoQueue"],
  data() {
    return {
      cards: [
        {
          title: "Pre-fab homes",
          src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
          flex: 3
        },
        {
          title: "Favorite road trips",
          src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
          flex: 3
        },
        {
          title: "Best airlines",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
          flex: 3
        }
      ]
    };
  },
  computed: {
    queue() {
      let videos = [];
      this.videoQueue.forEach((element, index) => {
        if (index !== 0) {
          videos.push(element);
        }
      });
      return videos;
    },
    nextVideo() {
      return this.videoQueue[1];
    },
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "3rem";
        case "sm":
          return "4rem";
        case "md":
          return "5rem";
        case "lg":
          return "6rem";
        case "xl":
          return "7rem";
      }
    }
  }
};
</script>

<style>
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: #1e162c;
}
.videoImage:hover .overlay {
  opacity: 0.8;
}
.videoImage {
  position: relative;
}
.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}

@media only screen and (max-width: 959px) {
  .videoQue {
    flex-wrap: nowrap;
    overflow: scroll;
  }
}
</style>
