import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import AuthenticationApi from "../api/AuthenticationApi";

function Activation() {
    const params = useParams();
    const [count, setCount] = useState(5);
    const [valid, setValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!valid) {
            async function fetchData() {
                const result = await AuthenticationApi.activateAccount(params.code)
                if (result.status) setValid(true)
                else navigate('/');
            }
            fetchData();
        }
        else {
            const timer = setTimeout(() => {
                setCount(count - 1);
                if (count <= 0) navigate('/');
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }
    }, [count, valid]);

    if (valid)
        return (
            <div className="hero-static d-flex align-items-center">
                <div className="w-100">
                    <div className="bg-body-extra-light">
                        <div className="content content-full">
                            <div className="row justify-content-center">
                                <div className="col-md-8 col-lg-6 col-xl-4 py-6">
                                    <div className="text-center">
                                        <p>
                                            <i className="fa fa-4x fa-circle-check text-success"></i>
                                        </p>
                                        <h1 className="h4 mb-1">
                                            Your account has been successfully activated!
                                        </h1>
                                        <h2 className="h6 fw-normal text-muted mb-3">
                                            You can log in to your account and start using our services
                                        </h2>
                                        <div className="mt-5">
                                            <p className="text-uppercase">Redirect to login page in <span className="fw-bold text-info">{count}</span> seconds</p>
                                            <Link to={'/'} className="btn btn-primary me-1 mb-3">
                                                <i className="fa fa-fw fa-right-to-bracket me-1"></i> Continue
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    else return <></>;
}

export default Activation;
