/* eslint-disable */
import {useState} from "react";
import authenticationApi from "../api/AuthenticationApi";
import {useNavigate} from "react-router-dom";

const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleGoogle = async (response) => {
        const result = await authenticationApi.googleLogin(response.credential);
        if (result.status) {
            One.helpers('jq-notify', {type: 'success', icon: 'fa fa-check me-1', message: result.message});
            localStorage.setItem("session", JSON.stringify(result.data));
            const url = localStorage.getItem('prevurl');
            localStorage.removeItem('prevurl');
            if (url) navigate(url);
            else navigate('/dashboard');
            return;
        }
        One.helpers('jq-notify', {type: 'danger', icon: 'fa fa-times me-1', message: result.message});
    };
    return {loading, error, handleGoogle};
};

export default useFetch;