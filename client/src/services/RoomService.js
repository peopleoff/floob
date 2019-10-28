import Api from '@/services/Api'

export default {
  register (data) {
    return Api().post('rooms/register', data)
  },
  getAll(data){
    return Api().post('rooms/getAll', data);
  },
  getInfo(data){
    return Api().post('rooms/getInfo', data);
  },
  checkRoomPassword(data){
    return Api().post('rooms/checkPassword', data);
  },
  toggleRoom(data){
    return Api().post('rooms/toggleRoom', data);
  }
}