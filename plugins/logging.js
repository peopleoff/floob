import Vue from 'vue'

Vue.mixin({
    methods:{
        log(level, message){
            console.log(message)
            console.log("hi");
        },
    }
})