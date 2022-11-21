import axiosClient from "./AxiosClient";

const memesApi = {
  getMemes: async () => {
    const url = "/get_memes";
    const response = await axiosClient.get(url);
    return response.data;
  }
};
export default memesApi;
