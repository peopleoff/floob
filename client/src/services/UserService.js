import Api from '@/services/Api'

export default {
  Register (data) {
    return Api().post('users/register', data)
  },
  login(data){
    return Api().post('users/login', data)
  },
  isAuth(data){
    return Api().post('isAuth', data)
  },
  getUsers(data){
    return Api().post('getUsers', data)
  },
  getUser(data){
    return Api().post('getUser', data)
  },
  updateUser(data){
    return Api().post('updateUser', data)
  },
  updateUserStatus(data){
    return Api().post('updateUserStatus', data)
  }
}