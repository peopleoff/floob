import Api from '@/services/Api'

export default {
  Register (data) {
    return Api().post('register', data)
  },
  getAll(data){
    return Api().post('rooms/getAll', data);
  },
  checkRoomPassword(data){
    return Api().post('rooms/checkPassword', data);
  },
  toggleRoom(data){
    return Api().post('rooms/toggleRoom', data);
  }
}