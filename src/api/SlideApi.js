import axios from "axios";
import { Retryer } from "react-query/types/core/retryer";
import axiosClient from "./AxiosClient";

const SlideApi = {
    createSlide: () => {
        const url = "/slide/create";
        return axiosClient.post(url);
    },
    deleteSlide: () => {
        const url = "slide/delete";
        return axiosClient.post(url);
    },
    addQuestion: () => {
        const url = "/slide/add/question";
        return axiosClient.post(url);
    },
    addAnswer: () => {
        const url = "/slide/add/answer";
        return axiosClient.post(url);
    },
    getSlideQuestion: () => {
        const url = "/slide/get/question";
        return axiosClient.get(url);
    },
    updateQuestion: () => {
        const url = "/slide/update/question";
        return axiosClient.post(url);
    },
    updateAnswer: () => {
        const url = "/slide/update/answer";
        return axiosClient.post(url);
    },
    deleteAnswer: () => {
        const url = "/slide/delete/answer";
        return axiosClient.post(url);
    },
    getSlideAnswer: () => {
        const url = "/slide/get/answer";
        return axiosClient.get(url);
    }
}