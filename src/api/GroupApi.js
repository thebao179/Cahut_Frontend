
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
    getOwnedGroups: ()=> {
        const url = "/group/get/managed";
        return axiosClient.get(url);
    },
    getJoinedGroups: ()=> {
        const url = "/group/get/joined";
        return axiosClient.get(url); 
    },
    getInvitationLink: (groupName)=> {
        const config = {
            params: {
                groupName: groupName,
            },
        }
        const url = "/group/get/invitelink";
        return axiosClient.get(url, config);
    },
    getGroupMembers: (groupName)=>{
        const config = {
            params: {
                groupName: groupName,
            },
        }
        const url = "/group/getall/groupmembers";
        return axiosClient.get(url, config);
    },
    inviteMembers: (groupName, email) => {
        const url = "/group/invite/" + groupName + "/" +  email;
        return axiosClient.post(url);
    },
    setRoleMember: (groupName, role, email) => {
        const url = "/group/set/role/" + groupName + "/" +  email + "/" + role;
        return axiosClient.get(url);
    },
    kickMember: (groupName, email) => {
        const url = "/group/manage/kick/" + groupName + "/" +  email;
        return axiosClient.get(url);
    },
    getGroupNumber: () => {
        const url = "/group/get/numofgroup";
        return axiosClient.get(url);
    }
}

export default groupApi;