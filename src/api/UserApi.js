import axiosClient from "./AxiosClient";

const userApi = {
    getUserInfo: () => {
        const url = "/user/info";

        return axiosClient.get(url);
    },
    editUserInfo: (username, phone) => {
        const url = "/user/info/update";
        return axiosClient.post(url, {UserName: username, Phone: phone});
    },
    changePassword: (currPassword, password) => {
        const url = "/auth/changepassword";
        return axiosClient.post(url, {CurrentPassword: currPassword, NewPassword: password});

    }
}

export default userApi;