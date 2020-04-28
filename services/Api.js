import axios from "axios";

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2)
    return parts
      .pop()
      .split(";")
      .shift();
}

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled
    ? false
    : true;
};

const errorHandler = error => {
  if (isHandlerEnabled(error.config)) {
    // Handle errors
  }
  console.log(error);
  return Promise.reject({ ...error });
};

const successHandler = response => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses
    // store.commit('STOP_LOADING');
  }
  console.log(response);
  return response;
};

function requestHandler(request) {
  console.log(request);
  if (isHandlerEnabled(request)) {
    // store.commit('START_LOADING');
    // const token = getCookie("token");
    // if (token) {
      // request.headers.Authorization = `Bearer ${token}`;
    // }
    return request;
  }
}

export default () => {
  const connection = axios.create({
    baseURL: process.env.baseUrl
  });

  connection.interceptors.request.use(request => requestHandler(request));
  connection.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
  );

  return connection;
};
