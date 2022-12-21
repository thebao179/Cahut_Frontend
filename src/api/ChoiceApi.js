import axiosClient from "./AxiosClient";

const choiceApi = {
    getAnswers: (questionId) => {
        const config = {
            params: {
                questionId: questionId,
            },
        }
        const url = "/slide/multiplechoice/get/options";
        return axiosClient.get(url, config);
    },
    deleteAnswer: (optionId) => {
        const config = {
            params: {
                optionId: optionId,
            },
        }
        const url = "/slide/multiplechoice/delete/option";
        return axiosClient.get(url, config);
    },
    submitAnswer: (optionId) => {
        const config = {
            params: {
                optionId: optionId,
            }
        }
        const url = "/slide/multiplechoice/submitchoice";
        return axiosClient.post(url, null, config);
    }
}

export default choiceApi;
