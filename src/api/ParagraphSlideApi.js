import axiosClient from "./AxiosClient";

const paragraphSlideApi = {
    getData: (slideId) => {
        const config = {
            params: {
                slideId: slideId
            }
        };
        const url = "/slide/paragraph/getSlide";
        return axiosClient.get(url, config);
    },
    updateData: (presentationId, slideId, heading, paragraph) => {
        const url = "/slide/paragraph/editSlide";
        return axiosClient.post(url, {
            presentationId: presentationId,
            slideId: slideId,
            headingContent: heading,
            paragraphContent: paragraph
        });
    }
};

export default paragraphSlideApi;
