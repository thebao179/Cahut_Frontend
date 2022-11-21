import axiosClient from "./AxiosClient";

const authenticationApi = {
  login: (username, password) => {
    const url = "/login";
    return axiosClient.get(url, { username, password });
  },
  signup: (username, password) => {
    const url = "/signup";
    return axiosClient.get(url, { username, password });
  }
};

export default authenticationApi;
