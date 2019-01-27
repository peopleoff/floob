<template>
  <Rooms :rooms=rooms />
</template>

<script>
  import Rooms from '@/components/Rooms'
  import RoomService from '@/services/RoomService.js'

  export default {
    name: 'Index',
    components: {
      Rooms
    },
    data() {
      return {
        rooms: []
      }
    },
    methods: {
      getRooms() {
        RoomService.getAll()
          .then(response => {
            this.rooms = response.data;
          })
          .catch(error => {
            console.log(error);
          })
      }
    },
    mounted(){
      this.getRooms();
    }
  }
</script>