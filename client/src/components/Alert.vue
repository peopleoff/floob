<template>
    <div id="alerts">
        <div class="alert alert-dismissible fade show" :class="'alert-'+type" role="alert" v-for="msg in message">
            <span class="alert-inner--icon"><i class="ni ni-like-2"></i></span>
            <span class="alert-inner--text">{{msg}}</span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Alert',
        props: {
            message: Array,
            type: String
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>