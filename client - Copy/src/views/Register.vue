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
                <div class="row justify-content-center">
                    <div class="col-lg-5">
                        <div class="card bg-secondary shadow border-0">
                            <div class="card-body px-lg-5 py-lg-5">
                                <div class="text-center text-muted mb-4">
                                    <h1>Sign Up</h1>
                                    <br>
                                    <small>
                                        Already have an account?
                                        <router-link to="/signin">
                                            <a>Sign In</a>
                                        </router-link>
                                    </small>
                                </div>
                                <form role="form" @submit.prevent="Register">
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-circle-08"></i></span>
                                            </div>
                                            <input class="form-control" placeholder="Name" type="text" v-model="user.name">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                            </div>
                                            <input class="form-control" placeholder="User Name" type="text" v-model="user.username">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                                            </div>
                                            <input class="form-control" placeholder="Email" type="email" v-model="user.email">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                            </div>
                                            <input class="form-control" placeholder="Password" type="password" v-model="user.password"
                                                data-toggle="tooltip" data-placement="right" title="Passwords must be at least 8 characters long.">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group input-group-alternative">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                                            </div>
                                            <input class="form-control" placeholder="Confirm Password" type="password"
                                                v-model="user.comfirmPassword" data-toggle="tooltip" data-placement="right"
                                                title="Passwords must match & be at least 8 characters long.">
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button type="button" class="btn btn-primary mt-4" v-on:click="register()"
                                            v-on:keyup.enter="register()" :disabled=disableCreate>Create
                                            account</button>
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
    import { mapState } from 'vuex'
    import { mapMutations } from 'vuex'
    export default {
        name: 'Register',
        components: {
            Alert
        },
        data() {
            return {
                user: {
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    comfirmPassword: ''
                },
                status: null,

            }
        },
        methods: {
            ...mapMutations([
                'ADD_USER'
            ]),
            register: function () {
                try {
                    UserService.Register(this.user).then(response => {
                        if (response.data.error) {
                            this.status = response.data;
                            let self = this;
                            setTimeout(function () {
                                self.status = '';
                            }, 5000);
                        }else{
                            this.ADD_USER(response.data);
                            this.$router.push('Chatroom') 
                        }
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        },
        computed: {
            disableCreate() {
                for (var property in this.user) {
                    if (this.user[property] == '') {
                        return true;
                    }
                }
                if (this.user.password.length < 8) {
                    return true;
                }
                if (this.user.password !== this.user.comfirmPassword) {
                    return true;
                }
                return false;
            }
        }
    }
</script>

<style scoped>
    main {
        height: 100vh;
    }
    .section-shaped{
        height: 100vh;
    }
</style>