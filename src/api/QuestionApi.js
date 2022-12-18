import axiosClient from "./AxiosClient";

const questionApi = {
    getQuestion: (slideId) => {
        const config = {
            params: {
                slideId: slideId,
            },
        }
        const url = "/slide/multiplechoice/get/question";
        return axiosClient.get(url, config);
    },
}

export default questionApi;
