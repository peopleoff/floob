<template>
    <v-toolbar color="primary">
        <router-link to="/" class="header">
            <v-avatar size=50 tile>
                <img :src="require('@/assets/logo.png')" alt="avatar">
            </v-avatar>
            Floob
        </router-link>
        <v-spacer></v-spacer>
        <v-btn round v-if="!this.$store.state.user" to='/login'>
            Sign-In or Sign-Up!
        </v-btn>
        <v-menu open-on-hover offset-y v-else>
            <v-btn flat slot="activator">
                {{this.$store.state.user.username}}
                <v-icon right id="dropdown">arrow_drop_down</v-icon>
            </v-btn>
            <v-list dark>
                <v-list-tile to="/">
                    Home
                </v-list-tile>
                <v-list-tile to="/profile">
                    Profile
                </v-list-tile>
                <v-list-tile to="/logout" color="error">
                    Logout
                </v-list-tile>
            </v-list>
        </v-menu>
        <v-btn @click="toggleVideoQueue()">
            _
            -30px-30px
        </v-btn>
    </v-toolbar>
</template>

<script>
    export default {
        name: 'Header',
        data() {
            return{

            }
        },
        methods: {
            toggleVideoQueue(){
                this.$emit('toggle');
            }
        }

    }
</script>

<style scoped>
    .header {
        text-decoration: none;
        color: white;
        margin-right: 30px;
    }
</style>