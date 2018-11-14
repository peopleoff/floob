<template>
  <main>
    <div v-if="status">
      <Alert v-bind:message="status.message" v-bind:type="status.type" />
    </div>
    <section class="section section-shaped section-lg">
      <div class="shape shape-style-1 bg-gradient-default">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-lg-5">
            <div class="card bg-secondary shadow border-0">
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                 <h1>Sign In</h1>
                 <small>Need to create an account? <router-link to="/register">Register Here</router-link></small>
                </div>
                <form role="form">
                  <div class="form-group">
                    <div class="input-group input-group-alternative mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="ni ni-circle-08"></i></span>
                      </div>
                      <input class="form-control" placeholder="User Name" type="text" v-model="user.username">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group input-group-alternative">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                      </div>
                      <input class="form-control" placeholder="Password" type="password" v-model="user.password">
                    </div>
                  </div>
                  <div class="custom-control custom-control-alternative custom-checkbox">
                    <input class="custom-control-input" id=" customCheckLogin" type="checkbox">
                    <label class="custom-control-label" for=" customCheckLogin">
                      <span>Remember me</span>
                    </label>
                  </div>
                  <div class="text-center">
                    <button type="button" class="btn btn-primary mt-4" :disabled="disableSignin" v-on:click="signIn()"
                      v-on:keyup.enter="signIn()">Sign In</button>
                  </div>
                </form>
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
      signIn: function () {
        UserService.signIn(this.user).then(response => {
          console.log(response.data);
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
.section-shaped{
  height: 100vh;
}
</style>