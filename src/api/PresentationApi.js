import axiosClient from "./AxiosClient";

const presentationApi = {
    createPresentation: (presentationName) => {
        const config = {
            params: {
                presentationName: presentationName,
            },
        }
        const url = "/presentation/create";
        return axiosClient.post(url, null, config);
    },
    deletePresentation: (presentationName) => {
        const config = {
            params: {
                presentationName: presentationName,
            },
        }
        const url = "/presentation/delete";
        return axiosClient.post(url, null, config);
    },
    getPresentation: () => {
        const url = "/presentation/getlist";
        return axiosClient.get(url);
    },
    updatePresentation: (presentationId, presentationName) => {
        const url = "/presentation/update";
        return axiosClient.post(url, {presentationId: presentationId, newName: presentationName});
    },
    getSlides: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/presentation/getslides";
        return axiosClient.get(url, config);
    },
    getPresentationName: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/presentation/name";
        return axiosClient.get(url, config);
    },
    getCollabPresentation: () => {
        const url = "/presentation/getCollabPresentations";
        return axiosClient.get(url);
    },
    getPresentationInfo: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/presentation/info";
        return axiosClient.get(url, config);
    },
    presentPublic: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/presentation/publicPresent";
        return axiosClient.get(url, config);
    },
    presentGroup: (presentationId, groupName) => {
        const config = {
            params: {
                presentationId: presentationId,
                groupName: groupName,
            },
        }
        const url = "/presentation/groupPresent";
        return axiosClient.get(url, config);
    },
    endPresentation: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/presentation/endPresentation";
        return axiosClient.get(url, config);
    },
    getCurrentSlidePublic: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/presentation/public/currentSlide";
        return axiosClient.get(url, config);
    },
    getCurrentSlideGroup: (presentationId, groupId) => {
        const config = {
            params: {
                presentationId: presentationId,
                groupId: groupId,
            },
        }
        const url = "/presentation/group/currentSlide";
        return axiosClient.get(url, config);
    },
    updateNextSlide: (presentationId, groupId) => {
        const config = {
            params: {
                presentationId: presentationId,
                groupId: groupId,
            },
        }
        const url = "/presentation/getNextSlide";
        return axiosClient.get(url, config);
    },
    updatePreviousSlide: (presentationId, groupId) => {
        const config = {
            params: {
                presentationId: presentationId,
                groupId: groupId,
            },
        }
        const url = "/presentation/getPrevSlide";
        return axiosClient.get(url, config);
    },
    getPresentationInfoTeacher: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/presentation/present/info";
        return axiosClient.get(url, config);
    },
    getGroupPresentationInfoStudent: (presentationId, groupId) => {
        const config = {
            params: {
                presentationId: presentationId,
                groupId: groupId,
            },
        }
        const url = "/presentation/group/view/info";
        return axiosClient.get(url, config);
    },
    getPresentationType: (presentationId) => {
        const config = {
            params: {
                presentationId: presentationId,
            },
        }
        const url = "/presentation/getType";
        return axiosClient.get(url, config);
    },
}

export default presentationApi;
