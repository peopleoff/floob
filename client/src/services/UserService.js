import Api from '@/services/Api'

export default {
  Register (data) {
    return Api().post('register', data)
  },
  signIn(data){
    return Api().post('signIn', data)
  }
}