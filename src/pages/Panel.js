import React, {useEffect} from "react";
import Footer from "../components/General/Footer";
import Dashboard from "../components/Panel/Dashboard";
import GroupOwned from "../components/Panel/GroupOwned";
import GroupJoined from "../components/Panel/GroupJoined";

function Panel() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/assets/js/oneui.app.min.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);
    return (
        <div id="page-container" className="page-header-dark main-content-boxed">
            <header id="page-header">
                <div className="content-header">
                    <div className="d-flex align-items-center">
                        <a className="fw-semibold fs-5 tracking-wider text-dual me-3">Realtime<span
                            className="fw-normal"> Learning</span></a>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="d-inline-block ms-2">
                            <button type="button" className="btn btn-sm btn-alt-secondary d-flex align-items-center">
                                <img className="rounded-circle" alt="" style={{width: 21 + 'px'}} src="/assets/media/avatars/avatar.jpg" />
                                    <span className="d-sm-inline-block ms-2">Trong Le</span>
                                    <i className="d-sm-inline-block opacity-50 ms-1"></i>
                            </button>
                        </div>
                        <div className="d-inline-block ms-2">
                            <button type="button" className="btn btn-sm btn-alt-danger d-flex align-items-center">
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
            <main id="main-container">
                <div className="bg-primary-darker">
                    <div className="bg-black-10">
                        <div className="content py-3">
                            <div className="d-lg-none">
                                <button
                                    type="button"
                                    className="btn w-100 btn-alt-secondary d-flex justify-content-between align-items-center"
                                    data-toggle="class-toggle" data-target="#main-navigation" data-class="d-none">Menu
                                    <i className="fa fa-bars"></i>
                                </button>
                            </div>
                            <div id="main-navigation" className="d-none d-lg-block mt-2 mt-lg-0">
                                <ul className="nav-main nav-main-dark nav-main-horizontal nav-main-hover">
                                    <li className="nav-main-item">
                                        <a className="nav-main-link active">
                                            <i className="nav-main-link-icon si si-compass"></i>
                                            <span className="nav-main-link-name">Dashboard</span>
                                        </a>
                                    </li>
                                    <li className="nav-main-item">
                                        <a className="nav-main-link nav-main-link-submenu" data-toggle="submenu"
                                           aria-haspopup="true" aria-expanded="true">
                                            <i className="nav-main-link-icon si si-users"></i>
                                            <span className="nav-main-link-name">Groups</span>
                                        </a>
                                        <ul className="nav-main-submenu">
                                            <li className="nav-main-item">
                                                <a className="nav-main-link">
                                                    <span className="nav-main-link-name">Group Owned</span>
                                                </a>
                                            </li>
                                            <li className="nav-main-item">
                                                <a className="nav-main-link">
                                                    <span className="nav-main-link-name">Group Joined</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Dashboard />
            </main>
            <Footer />
        </div>
    );
}

export default Panel;
