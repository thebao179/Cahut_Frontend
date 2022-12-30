import axiosClient from "./AxiosClient";

const multipleChoiceQuestionApi = {
    getQuestion: (slideId) => {
        const config = {
            params: {
                slideId: slideId,
            },
        }
        const url = "/slide/multiplechoice/get/question";
        return axiosClient.get(url, config);
    },
    getResultQuestions: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId
            }
        }
        const url = "/presentation/get/multipleChoiceQuestions";
        return axiosClient.get(url, config);
    }
}

export default multipleChoiceQuestionApi;
