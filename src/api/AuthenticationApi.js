import axiosClient from "./AxiosClient";

const authenticationApi = {
  login: (Email, Password) => {
    const url = "/auth/login";
    return axiosClient.post(url, { Email, Password });
  },
  signup: (email, username, password) => {
    const url = "/auth/register";
    return axiosClient.post(url, { email, username, password });
  },
  logout: () => {
    const url = "/auth/logout";
    return axiosClient.get(url);
  }
};

export default authenticationApi;
