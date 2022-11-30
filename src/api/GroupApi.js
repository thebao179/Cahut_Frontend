import axiosClient from "./AxiosClient";

const groupApi = {
    createGroup: (groupName) => {
        const config = {
            params: {
                groupName: groupName,
            },
        }
        const url = "/group/create/" + groupName;
        return axiosClient.post(url);
    },
    getOwnedGroups: () => {
        const url = "/group/get/managed";
        return axiosClient.get(url);
    },
    getJoinedGroups: () => {
        const url = "/group/get/joined";
        return axiosClient.get(url);
    },
    getInvitationLink: (groupName) => {
        const url = "/group/get/invitelink/" + groupName;
        return axiosClient.get(url);
    },
    getGroupMembers: (groupName) => {
        const url = "/group/getall/groupmembers/" + groupName;
        return axiosClient.get(url);
    },
    inviteMembers: (groupName, email) => {
        const config = {
            params: {
                groupName: groupName,
                emailArray: email,
            },
        }
        const url = "/group/invitemany";
        return axiosClient.post(url, {groupName: groupName, emailArray: email});
    },
    setRoleMember: (groupName, role, email) => {
        const url = "/group/set/role/" + groupName + "/" + email + "/" + role;
        return axiosClient.get(url);
    },
    kickMember: (groupName, email) => {
        const url = "/group/manage/kick/" + groupName + "/" + email;
        return axiosClient.get(url);
    },
    getGroupNumber: () => {
        const url = "/group/get/numofgroup";
        return axiosClient.get(url);
    },
    joinGroupByLink: (Code) => {
        const url = "/group/join/" + Code;
        return axiosClient.get(url);
    }
}

export default groupApi;