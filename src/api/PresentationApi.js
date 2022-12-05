import axiosClient from "./AxiosClient";

const presentationApi = {
    createPresentation: (presentationName) => {
        const config = {
            params: {
                presentationName: presentationName,
            },
        }
        const url = "/presentation/create";
        return axiosClient.post(url, null, config);
    },
    deletePresentation: (presentationName) => {
        const config = {
            params: {
                presentationName: presentationName,
            },
        }
        const url = "/presentation/delete";
        return axiosClient.post(url, null, config);
    },
    getPresentation: () => {
        const url = "/presentation/getlist";
        return axiosClient.get(url);
    },
    updatePresentation: (presentationId, presentationName) => {
        const url = "/presentation/update";
        return axiosClient.post(url);
    }
}

export default presentationApi;
