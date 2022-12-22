import axiosClient from "./AxiosClient";

const headingSlideApi = {
    getData: (slideId) => {
        const config = {
            params: {
                slideId: slideId
            }
        };
        const url = "/slide/heading/getSlide";
        return axiosClient.get(url, config);
    },
    updateData: (presentationId, slideId, heading, subHeading) => {
        const url = "/slide/heading/editSlide";
        return axiosClient.post(url, {presentationId: presentationId, slideId: slideId, headingContent: heading, subHeadingContent: subHeading});
    }
};

export default headingSlideApi;
