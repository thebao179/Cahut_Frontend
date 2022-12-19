import axiosClient from "./AxiosClient";

const authenticationApi = {
    login: (Email, Password) => {
        const url = "/auth/login";
        return axiosClient.post(url, {Email, Password});
    },
    signup: (Email, UserName, Password) => {
        const url = "/auth/register";
        return axiosClient.post(url, {Email, UserName, Password});
    },
    logout: () => {
        const url = "/auth/logout";
        return axiosClient.get(url);
    },
    googleLogin: (GoogleCredential) => {
        const url = "/auth/googlelogin";
        return axiosClient.post(url, {GoogleCredential})
    },
    activateAccount: (UserId) => {
        const url = "auth/activate/account/" + UserId;
        return axiosClient.get(url);
    },
    forgotPassword: (email) => {
        const config = {
            params: {
                email: email
            }
        };
        const url = "/auth/forgotpassword";
        return axiosClient.get(url, config);
    },
};

export default authenticationApi;
