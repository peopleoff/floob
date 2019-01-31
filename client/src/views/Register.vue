<template>
    <div id="register">
        <v-layout align-center justify-center>
            <v-flex xs12 sm10 md8 lg6 xl4>
                <v-card class="elevation-12 mt-5">
                    <v-toolbar color="primary">
                        <v-toolbar-title>Register Form</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field prepend-icon="person" name="username" label="Username" type="text" v-model="user.username"
                                :error-messages="usernameErrors"></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password" type="password" v-model="user.password"
                                :error-messages="passwordErrors"></v-text-field>
                            <v-text-field prepend-icon="email" name="email" label="Email" type="email" v-model="user.email"
                                :error-messages="emailErrors"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primaryAction" @click="Register" v-on:keyup.enter="register()"
                            :loading="loading">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-center row wrap>
            <v-flex xs12 sm10 md8 lg6 xl4>
                <v-card class="elevation-12 mt-5">
                    <v-card-title class="justify-center">
                        <h3 class="text-xs-center">Already registered? <router-link to="/login" class="white--text">Login
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
        required,
        minLength,
        email,
    } from 'vuelidate/lib/validators'
    import {
        mapMutations
    } from 'vuex'
    export default {
        name: 'Register',
        data() {
            return {
                loading: false,
                user: {
                    username: '',
                    password: '',
                    email: ''
                }
            }
        },
        validations: {
            user: {
                username: {
                    minLength: minLength(4),
                    required,
                },
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
        methods: {
            ...mapMutations([
                'UPDATE_SNACKBAR',
                'ADD_USER'
            ]),
            Register: function () {
                this.$v.$touch()
                if (this.$v.$invalid) {
                    return
                } else {
                    this.loading = true;
                    UserService.Register(this.user).then(response => {
                        this.loading = false;
                        if (response.data.error) {
                            return this.UPDATE_SNACKBAR(response.data);
                        } else {
                            this.UPDATE_SNACKBAR({
                                message: 'Account Created, Please login',
                                type: 'success'
                            });
                            this.$router.push('/login')
                        }
                    })
                }
            },
        },
        computed: {
            usernameErrors() {
                const errors = []
                if (!this.$v.user.username.$dirty) {
                    return errors
                }
                if (!this.$v.user.username.minLength) {
                    errors.push(`Must be at least ${this.$v.user.username.$params.minLength.min} characters long`)
                }
                if (!this.$v.user.username.required) {
                    errors.push('Username is required')
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