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



export default () => {
  const connection = axios.create({
    baseURL: process.env.VUE_APP_API
  });

  connection.interceptors.request.use(request => requestHandler(request));
  connection.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
  );

  return connection;
};
