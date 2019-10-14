<template>
    <div id="app">
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12 mt-5">
                        <v-form @keyup.native.enter="signIn">
                            <v-toolbar>
                                <v-toolbar-title>Login form</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-text-field prepend-icon="email" name="Email" label="Email" type="email"
                                    v-model="user.email" :error-messages="emailErrors"></v-text-field>
                                <v-text-field prepend-icon="lock" name="password" label="Password" type="password"
                                    v-model="user.password" :error-messages="passwordErrors"></v-text-field>
                                <router-link to="/PasswordReset" class="text-xs-right white--text"
                                    style="float: right;">Forgot
                                    Password?</router-link>
                                <v-checkbox v-model="rememberme" label="Remember Login?">
                                </v-checkbox>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="signIn" :loading="loading">Login</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fluid fill-height>
            <v-layout>
                <v-flex xs12 sm8 md4 offset-sm2 offset-md4>
                    <v-card>
                        <v-card-title class="justify-center">
                            <h3 class="text-xs-center">Need an account? <router-link to="/register" class="white--text">
                                    Register Here</router-link>
                            </h3>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>


<script>
    import UserService from '@/services/UserService'
    import {
        mapMutations
    } from 'vuex'
    import {
        required,
        email,
        minLength
    } from 'vuelidate/lib/validators'
    export default {
        name: 'Login',
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                },
                loading: false,
                rememberme: false,
                status: null
            }
        },
        methods: {
            ...mapMutations([
                'ADD_USER',
                'UPDATE_SNACKBAR'
            ]),
            signIn: function () {
                this.$v.$touch();
                this.loading = true;
                if (this.$v.$invalid) {
                    this.loading = false;
                    return
                } else {
                    UserService.login(this.user).then(response => {
                        this.loading = false;
                        if (response.data.message) {
                            this.UPDATE_SNACKBAR(response.data)
                        } else {
                            let today = new Date();
                            if (this.rememberme) {
                                //If remember me is checked, create cookie token cookie for a week
                                today.setTime(today.getTime() + 3600000 * 24 * 7);
                                document.cookie = "token=" + escape(response.data.token) + ";expires=" +
                                    today.toGMTString();
                            } else {
                                //Otherwise set expiration for one hour
                                today.setTime(today.getTime() + 1 * 3600 * 1000);
                                document.cookie = "token=" + escape(response.data.token) + ";expires=" +
                                    today.toGMTString();
                            }
                            this.ADD_USER({
                                user: response.data
                            });
                            this.$router.go(-1);
                        }
                    })
                }
            },
        },
        validations: {
            user: {
                email: {
                    minLength: minLength(4),
                    email,
                    required,
                },
                password: {
                    minLength: minLength(6),
                    required,
                }
            }
        },
        computed: {
            emailErrors() {
                const errors = []
                if (!this.$v.user.email.$dirty) {
                    return errors
                }
                if (!this.$v.user.email.minLength) {
                    errors.push(`Must be at least ${this.$v.user.email.$params.minLength.min} characters long`)
                }
                if (!this.$v.user.email.email) {
                    errors.push(`Must be a valid email`)
                }
                if (!this.$v.user.email.required) {
                    errors.push('Email is required')
                }
                return errors
            },
            passwordErrors() {
                const errors = []
                if (!this.$v.user.password.$dirty) {
                    return errors
                }
                if (!this.$v.user.password.minLength) {
                    errors.push(`Must be at least ${this.$v.user.password.$params.minLength.min} characters long`)
                }
                if (!this.$v.user.password.required) {
                    errors.push('Password is required')
                }
                return errors
            },

        }
    }
</script>

<style scoped>

</style>