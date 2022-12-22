import axiosClient from "./AxiosClient";

const slideApi = {
    createSlide: (presentationId, type) => {
        const url = "/slide/create";
        return axiosClient.post(url, {presentationId: presentationId, slideType: type});
    },
    removeSlide: (presentationId, slideId, type) => {
        const url = "/slide/delete";
        return axiosClient.post(url, {presentationId: presentationId, slideType: type, slideId: slideId});
    }
}

export default slideApi;
