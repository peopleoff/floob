<template>
<main>
    <section class="section pb-0 bg-gradient-warning">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6 order-lg-2 ml-lg-auto">
            <div class="position-relative pl-md-5">
              <img src="../../public/img/ill/ill-2.svg" class="img-center img-fluid">
            </div>
          </div>
          <div class="col-lg-6 order-lg-1">
            <div class="d-flex px-3">
              <div>
                <div class="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                  <eva-icon name="github" animation="pulse" fill="limegreen"></eva-icon>
                </div>
              </div>
              <div class="pl-4">
                <h4 class="display-3 text-white">Floob</h4>
                <p class="text-white">An amazing way to share and watch videos with your friends.</p>
                <router-link to="/">Home</router-link>
              </div>
            </div>
            <div class="card shadow shadow-lg--hover mt-5">
              <div class="card-body">
                <div class="d-flex px-3">
                  <div>
                    <div class="icon icon-shape bg-gradient-success rounded-circle text-white">
                      <i class="ni ni-satisfied"></i>
                    </div>
                  </div>
                  <div class="pl-4">
                    <h5 class="title text-success">Awesome Support</h5>
                    <p>The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever.</p>
                    <a href="#" class="text-success">Learn more</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="card shadow shadow-lg--hover mt-5">
              <div class="card-body">
                <div class="d-flex px-3">
                  <div>
                    <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                      <i class="ni ni-active-40"></i>
                    </div>
                  </div>
                  <div class="pl-4">
                    <h5 class="title text-warning">Modular Components</h5>
                    <p>The Arctic Ocean freezes every winter and much of the sea-ice then thaws every summer, and that process will continue whatever.</p>
                    <a href="#" class="text-warning">Learn more</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- SVG separator -->
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-white" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </section>
    <section class="section section-lg">
      <div class="container">
        <div class="row row-grid justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-3">Do you love this awesome
              <span class="text-success">Design System for Bootstrap 4?</span>
            </h2>
            <p class="lead">Cause if you do, it can be yours for FREE. Hit the button below to navigate to Creative Tim where you can find the Design System in HTML. Start a new project or give an old Bootstrap project a new look!</p>
            <div class="btn-wrapper">
              <a href="https://www.creative-tim.com/product/argon-design-system" class="btn btn-primary mb-3 mb-sm-0">Download Now</a>
            </div>
            <div class="text-center">
              <h4 class="display-4 mb-5 mt-5">Available on these technologies</h4>
              <div class="row justify-content-center">
                <div class="col-lg-2 col-4">
                  <a href="https://www.creative-tim.com/product/argon-design-system" target="_blank" data-toggle="tooltip" data-original-title="Bootstrap 4 - Most popular front-end component library">
                    <img src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/bootstrap.jpg" class="img-fluid">
                  </a>
                </div>
                <div class="col-lg-2 col-4">
                  <a href=" https://www.creative-tim.com/product/vue-argon-design-system" target="_blank" data-toggle="tooltip" data-original-title="Vue.js - The progressive javascript framework">
                    <img src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/vue.jpg" class="img-fluid">
                  </a>
                </div>
                <div class="col-lg-2 col-4">
                  <a href=" https://www.sketchapp.com/" target="_blank" data-toggle="tooltip" data-original-title="[Coming Soon] Sketch - Digital design toolkit">
                    <img src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/sketch.jpg" class="img-fluid opacity-3">
                  </a>
                </div>
                <div class="col-lg-2 col-4">
                  <a href=" https://www.adobe.com/products/photoshop.html" target="_blank" data-toggle="tooltip" data-original-title="[Coming Soon] Adobe Photoshop - Software for digital images manipulation">
                    <img src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/ps.jpg" class="img-fluid opacity-3">
                  </a>
                </div>
                <div class="col-lg-2 col-4">
                  <a href=" https://angularjs.org/" target="_blank" data-toggle="tooltip" data-original-title="[Coming Soon] Angular - One framework. Mobile &amp; desktop">
                    <img src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/angular.jpg" class="img-fluid opacity-3">
                  </a>
                </div>
                <div class="col-lg-2 col-4">
                  <a href=" https://angularjs.org/" target="_blank" data-toggle="tooltip" data-original-title="[Coming Soon] React - A JavaScript library for building user interfaces">
                    <img src="https://s3.amazonaws.com/creativetim_bucket/tim_static_images/presentation-page/react.jpg" class="img-fluid opacity-3">
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import UserService from '@/services/UserService'
  import Alert from '@/components/Alert.vue'
  import {
    mapMutations
  } from 'vuex'
  export default {
    name: 'Index',
    components: {
      Alert
    },
    data() {
      return {
        user: {
          username: '',
          password: ''
        },
        status: null

      }
    },
    methods: {
      ...mapMutations([
        'ADD_USER'
      ]),
      login: function () {
        UserService.login(this.user).then(response => {
          if (response.data.error) {
            this.status = response.data;
            let self = this;
            setTimeout(function () {
              self.status = '';
            }, 5000);
          } else {
            this.ADD_USER(response.data);
            this.$router.push('Chatroom')
          }
        })
      },
      ifError: function () {
        if (this.$route.params.error) {
          this.status = this.$route.params
          let self = this;
          setTimeout(function () {
            self.status = '';
          }, 5000);
        }
      }
    },
    computed: {
      disableSignin() {
        for (var property in this.user) {
          if (this.user[property] == '') {
            return true;
          }
        }
        if (this.user.password.length < 8) {
          return true;
        }
        return false;
      }
    },
    mounted() {
      this.ifError();
    },
  }
</script>

<style scoped>
.bg-gradient-warning{
  background: linear-gradient(87deg, #172b4d 0, #1a174d 100%) !important;
}

</style>