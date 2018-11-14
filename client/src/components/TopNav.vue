<template>
    <nav id="navbar-main" class="navbar navbar-main navbar-expand-lg navbar-transparent navbar-light"
        v-if="this.$store.state.user">
        <div class="container">
            <a class="navbar-brand mr-lg-5" href="../index.html">

            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global"
                aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="navbar_global">
                <div class="navbar-collapse-header">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <a href="../index.html">

                            </a>
                        </div>
                        <div class="col-6 collapse-close">
                            <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbar_global"
                                aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
                <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link" data-toggle="dropdown" role="button">
                            <i class="ni ni-collection d-lg-none"></i>
                            <span class="nav-link-inner--text">{{ this.$store.state.user.username }}</span>
                        </a>
                        <div class="dropdown-menu">
                            <button type="button" class="btn btn-danger" v-on:click="signOut()">Sign Out</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import {
        mapMutations
    } from 'vuex'
    export default {
        name: 'TopNav',
        data() {
            return {

            }
        },
        methods: {
            ...mapMutations([
                'SIGN_OUT'
            ]),
            signOut: function () {
                this.SIGN_OUT();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #navbar_global {
        justify-content: flex-end
    }
    .navbar{
        padding: 0;
        padding-top: 1rem;
    }
    button{
        margin: 10px;
    }
    .navbar-nav.navbar-nav-hover .nav-item.dropdown:hover > .dropdown-menu{
        margin: 0;
        min-width: 0;
        padding: 0;
        transition: none;
    }
    .navbar-nav.navbar-nav-hover .dropdown-menu{
        transition: none !important;
    }
</style>