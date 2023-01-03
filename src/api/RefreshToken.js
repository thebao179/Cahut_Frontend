import {axiosPublic} from "./AxiosPublic";
import mem from "mem";

const refreshTokenFn = async () => {
    const session = JSON.parse(localStorage.getItem("session"));
    try {
        const config = {
            params: {
                AccessToken: session?.accessToken,
                RefreshToken: session?.refreshToken,
            }
        };
        const response = await axiosPublic.post("/token/refresh", null, config);
        const token = response.data;
        if (!token) localStorage.removeItem("session");
        else localStorage.setItem("session", JSON.stringify(response.data));
        return session;
    } catch (error) {
        localStorage.removeItem("session");
    }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {maxAge});
