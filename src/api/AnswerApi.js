import axiosClient from "./AxiosClient";

const answerApi = {
    getAnswers: (questionId) => {
        const config = {
            params: {
                questionId: questionId,
            },
        }
        const url = "/slide/get/answers";
        return axiosClient.get(url, config);
    },
    deleteAnswer: (answerId) => {
        const config = {
            params: {
                answerId: answerId,
            },
        }
        const url = "/slide/delete/answer";
        return axiosClient.get(url, config);
    },
}

export default answerApi;
