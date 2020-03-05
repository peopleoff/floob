import Api from "@/services/Api";

export default {
  Register(data) {
    return Api().post("users/register", data);
  },
  login(data) {
    return Api().post("users/login", data);
  },
  tokenLogin(data) {
    return Api().post("users/tokenLogin", data);
  },
  isAuth(data) {
    return Api().post("isAuth", data);
  },
  getUsers(data) {
    return Api().post("users/getUsers", data);
  },
  getUser(data) {
    return Api().post("getUser", data);
  },
  requestPasswordChange(data) {
    return Api().post("users/requestPasswordChange", data);
  },
  changePassword(data) {
    return Api().post("users/changePassword", data);
  },
  updateUser(data) {
    return Api().post("updateUser", data);
  },
  updateUserStatus(data) {
    return Api().post("updateUserStatus", data);
  }
};
