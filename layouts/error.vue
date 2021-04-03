<template>
  <v-app dark>
    <v-container id="error">
      <span class="circle circle-1"></span>
      <span class="circle circle-2"></span>
      <span class="circle circle-3"></span>
      <span class="circle circle-4"></span>
      <v-row class="justify-center align-center banner">
        <v-col cols="12" md="6" class="d-none d-md-block z-5">
          <v-img :src="require('@/assets/images/error.svg')" />
        </v-col>
        <v-col cols="12" md="6" class="z-5">
          <h1 class="text-h1">
            {{ error.statusCode }}
          </h1>
          <p class="text-h4">{{ getTitle() }}</p>
          <p class="text-h6 font-weight-light">
            {{ getDescription() }}
          </p>
          <v-btn
            elevation="24"
            height="50"
            block
            color="kings_purple"
            class="rounded-pill"
            nuxt
            href="/"
            >Go Back Home</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  methods: {
    getTitle() {
      if (this.error.statusCode === 404) {
        return "UH OH! You're lost.";
      } else {
        return "UH OH! Something went wrong";
      }
    },
    getDescription() {
      if (this.error.statusCode === 404) {
        return "The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go back to the homepage.";
      } else {
        return "We're not exactly sure what happened, but our servers say it was bad.";
      }
    },
  },
  head() {
    const title = 'Floob - ' + this.error.statusCode;
    return {
      title,
    };
  },
};
</script>

<style scoped>
.theme--dark.v-application {
  background: #662d91 !important;
}

#error {
  background: #662d91;
  position: relative;
}

.banner {
  height: 90vh;
}

#error .wave {
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 1;
}

#error .headline {
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

#error .circle-1 {
  height: 100px;
  width: 100px;
  top: 25%;
  right: 89%;
}
#error .circle-2 {
  height: 200px;
  width: 200px;
  top: 11%;
  right: 17%;
}
#error .circle-3 {
  height: 100px;
  width: 100px;
  top: 73%;
  right: 63%;
}
#error .circle-4 {
  top: 04%;
  right: 80%;
}
</style>
