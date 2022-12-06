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
    },
    getSlides: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/presentation/getslides";
        return axiosClient.get(url, config);
    }
}

export default presentationApi;
