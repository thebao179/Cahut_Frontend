import axios from "axios";
import {memoizedRefreshToken} from "./RefreshToken";
import history from "../router/history";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API
});

axiosClient.interceptors.request.use(
    async (config) => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session?.accessToken)
            config.headers.Authorization = `Bearer ${session?.accessToken}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async function (error) {
        const config = error?.config;
        if (error?.response?.status === 401 && !config?.sent) {
            config.sent = true;
            const result = await memoizedRefreshToken();
            if (result?.accessToken) {
                config.headers = {
                    authorization: `Bearer ${result?.accessToken}`,
                };
                return axios(config);
            } else {
                localStorage.setItem('prevurl', history.state.location.pathname);
                history.navigate('/');
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
