import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.imgflip.com"
  // headers: {
  //     'content-type': 'application/json',
  // },
  // paramsSerializer: params => queryString.stringify(params),
});

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
