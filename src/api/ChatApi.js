import axiosClient from "./AxiosClient";

const chatApi = {
    getAllChatMessages: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/chat/getMessage";
        return axiosClient.get(url, config);
    },

    sendMessage: (senderEmail, message, presentationId) => {
        const config = {
            params: {
                senderEmail: senderEmail,
                message: message,
                presentationId: presentationId
            },
        }
        const url = "/chat/sendMessage";
        return axiosClient.post(url, {senderEmail: senderEmail, message: message, presentationId, presentationId});
    },
}

export default chatApi;