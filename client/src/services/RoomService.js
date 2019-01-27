import Api from '@/services/Api'

export default {
  Register (data) {
    return Api().post('register', data)
  },
  getAll(){
    return Api().get('rooms/getAll');
  },
  checkRoomPassword(data){
    return Api().post('rooms/checkPassword', data);
  }
}