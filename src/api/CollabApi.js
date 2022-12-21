import axiosClient from "./AxiosClient";

const collabApi = {
    getCollabs: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/presentation/getCollaborators";
        return axiosClient.get(url, config);
    },
    addCollabs: (presentationId, email) => {
        const url = "/presentation/addCollaborators";
        return axiosClient.post(url, {presentationId: presentationId, emailArray: email});
    },
    removeCollab: (presentationId, email) => {
        const url = "/presentation/removeCollaborator";
        return axiosClient.post(url, {presentationId: presentationId, email: email});
    }
};

export default collabApi;
