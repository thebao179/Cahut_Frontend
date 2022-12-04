import axiosClient from "./AxiosClient";

const PresentationApi = {
    createPresentation: (presentationName) => {
        const config = {
            params: {
                presentationName: presentationName,
            },
        }
        const url = "/presentation/create";
        return axiosClient.post(url, {presentationName: presentationName});
    },
    updatePresentation: () => {
        const url = "/presentation/update";
        return axiosClient.post(url);
    },
    deletePresentation: () => {
        const url = "/presentation/delete";
        return axiosClient.post(url);
    },
    getPresentations: () => {
        const url = "/presentation/getlist";
        return axiosClient.get(url);
    }
}