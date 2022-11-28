import axios from "axios";


const axiosClient = axios.create({
  baseURL: "https://localhost:7080/",
});

axiosClient.interceptors.request.use(
  async (config) => {

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization =  `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
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
