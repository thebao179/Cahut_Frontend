import axiosClient from "./AxiosClient";

const slideApi = {
    createMultipleChoiceSlide: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/slide/multiplechoice/create/";
        return axiosClient.post(url, null, config);
    },
    deleteMultipleChoiceSlide: (slideId) => {
        const config = {
            params: {
                slideId: slideId,
            },
        }
        const url = "/slide/multiplechoice/delete";
        return axiosClient.get(url, config);
    },
    updateMultipleChoiceSlide: (question, options) => {
        const url = "/slide/multiplechoice/update";
        return axiosClient.post(url, {question: question, options: options});
    }
}

export default slideApi;
