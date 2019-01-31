<template>
    <div id="login">
        <v-layout align-center justify-center row wrap>
            <v-flex xs12 sm10 md8 lg6 xl4>
                <v-card class="elevation-12 mt-5">
                    <v-toolbar color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="email" name="email" label="Email" type="email" v-model="user.email"
                                :error-messages="emailErrors"></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="user.password"
                                :error-messages="passwordErrors"></v-text-field>
                            <router-link to="/PasswordReset" class="text-xs-right white--text" style="float: right;">Forgot
                                Password?</router-link>
                            <v-checkbox color="action_add" v-model="rememberme" label="Remember Login?"></v-checkbox>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="action_add" @click="login" :loading="loading">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-center row wrap>
            <v-flex xs12 sm10 md8 lg6 xl4>
                <v-card class="elevation-12 mt-5">
                    <v-card-title class="justify-center">
                        <h3 class="text-xs-center">Need an account? <router-link to="/register" class="white--text">Register
                                Here</router-link>
                        </h3>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import UserService from '@/services/UserService'
    import {
        mapMutations
    } from 'vuex'
    import {
        required,
        minLength,
        email,
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
            }
        },
        methods: {
            ...mapMutations([
                'UPDATE_SNACKBAR',
                'ADD_USER'
            ]),
            login: function () {
                this.$v.$touch();
                this.loading = true;
                if (this.$v.$invalid) {
                    return
                } else {
                    UserService.login(this.user).then(response => {
                        this.loading = false;
                        if (response.data.error) {
                            return this.UPDATE_SNACKBAR(response.data);
                        } else {
                            var today = new Date();
                            var expire = new Date();
                            if (this.rememberme) {
                                //If remember me is checked, create cookie token cookie for a week
                                expire.setTime(today.getTime() + 3600000 * 24 * 7);
                                document.cookie = "token=" + escape(response.data.token) + ";expires=" +
                                    expire.toGMTString();
                            } else {
                                //Otherwise set expiration for one hour
                                expire.setTime(today.getTime() + 1 * 3600 * 1000);
                                document.cookie = "token=" + escape(response.data.token) + ";expires=" +
                                    expire.toGMTString();
                            }
                            this.ADD_USER({
                                username: response.data.username
                            });
                            this.$router.push('/')
                        }
                    })
                }
            },
        },
        validations: {
            user: {
                password: {
                    minLength: minLength(6),
                    required,
                },
                email: {
                    minLength: minLength(4),
                    required,
                    email,
                }
            }
        },
        computed: {
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
            emailErrors() {
                const errors = []
                if (!this.$v.user.email.$dirty) {
                    return errors
                }
                if (!this.$v.user.email.email) {
                    errors.push('Must be valid e-mail')
                }
                if (!this.$v.user.email.required) {
                    errors.push('E-mail is required')
                }
                return errors
            }
        }
    }
</script>

<style>

</style>