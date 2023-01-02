import { sendMessage } from "@microsoft/signalr/dist/esm/Utils";
import axiosClient from "./AxiosClient";

const presentationQuestionApi = {
    sendQuestion: (question, presentationId) => {
        const config = {
            params:{
                presentationId: presentationId,
                question: question
            },
        }
        const url = "/question/sendQuestion";
        return axiosClient.post(url, {presentationId: presentationId, question: question});
    },

    upvoteQuestion: (questionId) =>{
        const config = {
            params:{
                questionId: questionId
            },
        }
        const url = "/question/upVoteQuestion";
        return axiosClient.post(url, null, config);
    },

    unUpvoteQuestion: (questionId) =>{
        const config = {
            params:{
                questionId: questionId
            },
        }
        const url = "/question/unUpVoteQuestion";
        return axiosClient.post(url, null, config);
    },

    getAllQuestion: (presentationId) => {
        const config = {
            params:{
                presentationId: presentationId,
            },
        }
        const url = "/question/getQuestions";
        return axiosClient.get(url, config);
    },

    getAnsweredQuestion: (presentationId) => {
        const config = {
            params:{
                presentationId:presentationId,
            },
        }
        const url = "/question/getAnsweredQuestions";
        return axiosClient.get(url,config);
    },

    getUnAnsweredQuestion: (presentationId) => {
        const config = {
            params:{
                presentationId:presentationId,
            },
        }
        const url = "/question/getUnAnsweredQuestions";
        return axiosClient.get(url,config);
    },

    updateQuestionStatus: (questionId, groupId) =>{
        const config = {
            params:{
                questionId: questionId,
                groupId: groupId
            },
        }
        const url = "/question/updateQuestionAnswered";
        return axiosClient.post(url, null, config);
    },
}

export default presentationQuestionApi;