import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import groupApi from "../api/GroupApi";

function GroupJoin() {
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            await groupApi.joinGroupByLink(params.code).catch(function (error) {
                navigate('/');
            });
            navigate('/');
        }

        fetchData();
    }, []);

    return <></>;
}

export default GroupJoin;
