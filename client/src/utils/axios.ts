import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:3000/api" });

// Request interceptor
instance.interceptors.request.use(
  function (req) {
    if (localStorage.getItem('token')) {
      req.headers.Authorization = "Bearer " + localStorage.getItem('token');
    }

    return req;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

// Response interceptor for global loading state
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
