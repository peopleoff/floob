<template>
  <Rooms :publicRooms=publicRooms :privateRooms=privateRooms />
</template>

<script>
  import Rooms from '@/components/Rooms'
  import RoomService from '@/services/RoomService.js'
  import {
    mapMutations
  } from 'vuex'

  export default {
    name: 'Index',
    components: {
      Rooms
    },
    data() {
      return {
        publicRooms: [],
        privateRooms: []
      }
    },
    methods: {
      ...mapMutations([
        'TOGGLE_LOADING'
      ]),
      getRooms() {
        RoomService.getAll()
          .then(response => {
            response.data.forEach(element => {
              if (element.password) {
                this.privateRooms.push(element);
              } else {
                this.publicRooms.push(element);
              }
            });
            this.TOGGLE_LOADING();
          })
          .catch(error => {
            console.log(error);
          })
      }
    },
    mounted() {
      this.getRooms();
    }
  }
</script>