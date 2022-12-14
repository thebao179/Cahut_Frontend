import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import authenticationApi from "../../api/AuthenticationApi";
import userApi from "../../api/UserApi";

function Header({profileUpd}) {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await authenticationApi.logout();
        if (result.status) {
            localStorage.removeItem('session');
            navigate('/');
        }
    };
    useEffect(() => {
        async function fetchData() {
            const data = await userApi.getUserInfo();
            if (data.status) setUser(data.data);
        }

        fetchData();
    }, [profileUpd]);

    return (
        <header id="page-header">
            <div className="content-header">
                <div className="d-flex align-items-center">
                    <a className="fw-semibold fs-5 tracking-wider text-dual me-3">Realtime<span
                        className="fw-normal"> Learning</span></a>
                </div>
                <div className="d-flex align-items-center">
                    <div className="d-inline-block ms-2">
                        <Link to={'/profile'} className="btn btn-sm btn-alt-secondary d-flex align-items-center">
                            <img className="rounded-circle" alt="" style={{width: 21 + 'px'}}
                                 src="/assets/media/avatars/avatar.jpg"/>
                            <span className="d-sm-inline-block ms-2">{user.userName}</span>
                            <i className="d-sm-inline-block opacity-50 ms-1"></i>
                        </Link>
                    </div>
                    <div className="d-inline-block ms-2">
                        <button onClick={() => handleLogout()}
                                className="btn btn-sm btn-alt-danger d-flex align-items-center">
                            <span className="d-sm-inline-block ms-2">Log Out</span>
                            <i className="fa fa-fw fa-right-from-bracket d-sm-inline-block opacity-50 ms-1"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div id="page-header-loader" className="overlay-header bg-primary-lighter">
                <div className="content-header">
                    <div className="w-100 text-center">
                        <i className="fa fa-fw fa-circle-notch fa-spin text-primary"></i>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
