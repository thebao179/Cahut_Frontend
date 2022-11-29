/* eslint-disable */
import { useState } from "react";
import authenticationApi from "../api/AuthenticationApi";

const useFetch = (setToken) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogle = async (response) => {
        const result = await authenticationApi.googleLogin(response.credential);
        if (result.status) {
            One.helpers('jq-notify', { type: 'success', icon: 'fa fa-check me-1', message: result.message });
            setTimeout(function () {
                setToken(result.data.accessToken);
            });
            return;
        }
        One.helpers('jq-notify', { type: 'danger', icon: 'fa fa-times me-1', message: result.message });
    };
    return { loading, error, handleGoogle };
};

export default useFetch;