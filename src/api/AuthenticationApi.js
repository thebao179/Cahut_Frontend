import axiosClient from "./AxiosClient";

const authenticationApi = {
  login: (username, password) => {
    const url = "/login";
    return axiosClient.post(url, { username, password });
  },
  signup: (email, username, password) => {
    const url = "/signup";
    return axiosClient.post(url, { email, username, password });
  }
};

export default authenticationApi;
