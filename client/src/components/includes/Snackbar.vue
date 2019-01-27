<template>
    <v-snackbar v-model="active" bottom :color="snackbar.type" :timeout="timeout" v-if="snackbar">
        {{snackbar.message}}
        <v-icon @click="snackbar.active = false">close</v-icon>
    </v-snackbar>
</template>

<script>
    export default {
        name: 'Snackbar',
        props: ['snackbar'],
        data() {
            return {
                active: false,
                timeout: 3000,
            }
        },
        sockets: {
            message: function (payload) {
                this.active = true;
                this.snackbar = payload;
            }
        },
        watch: {
            snackbar(){
                this.active = true;
            }
        }
    }
</script>

<style>

</style>