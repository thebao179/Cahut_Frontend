import axiosClient from "./AxiosClient";

const slideApi = {
    createSlide: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/slide/create/";
        return axiosClient.post(url, null, config);
    },
    deleteSlide: (slideId) => {
        const config = {
            params: {
                slideId: slideId,
            },
        }
        const url = "/slide/delete";
        return axiosClient.get(url, config);
    },
    updateSlide: (question, answers) => {
        const url = "/slide/update";
        return axiosClient.post(url, {question: question, answers: answers});
    }
}

export default slideApi;
