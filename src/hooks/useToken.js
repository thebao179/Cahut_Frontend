import {useState} from 'react';

function useToken() {
    const getToken = () => localStorage.getItem('token')

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token: token,
    }
}

export default useToken;