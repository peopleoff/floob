<template>
    <v-toolbar color="primary" class="pa-2" style="z-index: 100">
        <router-link to="/" class="header display-1 hidden-sm-and-down">
            <v-avatar size=40 tile>
                <img :src="require('@/assets/images/logo.png')" alt="avatar">
            </v-avatar>
            Floob
        </router-link>
        <router-link to="/" class="header display-2 hidden-md-and-up">
            <v-avatar size=50 tile>
                <img :src="require('@/assets/images/logo.png')" alt="avatar">
            </v-avatar>
        </router-link>
        <Searchbar v-if="['Chatroom'].indexOf($route.name) > -1 && this.$store.state.user" />
        <v-spacer></v-spacer>
        <v-btn round v-if="!this.$store.state.user" to='/login' class="secondary_text--text grad-button">
            Sign-In or Sign-Up!
        </v-btn>
        <v-menu open-on-hover offset-y v-else  transition="fade-transition">
            <v-btn flat slot="activator">
                {{this.$store.state.user.username}}
                <v-icon right id="dropdown">arrow_drop_down</v-icon>
            </v-btn>
            <v-list dark>
                <v-list-tile to="/logout">
                    Logout
                </v-list-tile>
            </v-list>
        </v-menu>
        <v-toolbar-side-icon v-if="$route.name === 'Chatroom'" @click="toggleChatroomSidebar()" class="hidden-md-and-up"></v-toolbar-side-icon>
    </v-toolbar>
</template>

<script>
    import {
        mapMutations
    } from 'vuex'
    import Searchbar from '@/components/Searchbar'
    export default {
        name: 'Header',
        components: {
            Searchbar
        },
        data() {
            return {

            }
        },
        methods: {
            ...mapMutations([
                'TOGGLE_SIDEBAR'
            ]),
            toggleChatroomSidebar() {
                this.TOGGLE_SIDEBAR();
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