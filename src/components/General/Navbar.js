import React from "react";
import {Link, useLocation} from "react-router-dom";

function Navbar({ component }) {
    return (
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
                                <Link to={'/dashboard'} className={`nav-main-link ${component === 'dashboard' && 'active'}`}>
                                    <i className="nav-main-link-icon si si-compass"></i>
                                    <span className="nav-main-link-name">Dashboard</span>
                                </Link>
                            </li>
                            <li className="nav-main-item">
                                <a className={`nav-main-link nav-main-link-submenu ${(component === 'gowned' || component === 'gjoined') && 'active'}`} data-toggle="submenu"
                                    aria-haspopup="true" aria-expanded="true">
                                    <i className="nav-main-link-icon si si-users"></i>
                                    <span className="nav-main-link-name">Groups</span>
                                </a>
                                <ul className="nav-main-submenu">
                                    <li className="nav-main-item">
                                        <Link to={'/groups/owned'} className={`nav-main-link ${component === 'gowned' && 'active'}`}>
                                            <span className="nav-main-link-name">Group Owned</span>
                                        </Link>
                                    </li>
                                    <li className="nav-main-item">
                                        <Link to={'/groups/joined'} className={`nav-main-link ${component === 'gjoined' && 'active'}`}>
                                            <span className="nav-main-link-name">Group Joined</span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-main-item">
                                <Link to={'/profile'} className={`nav-main-link ${component === 'profile' && 'active'}`}>
                                    <i className="nav-main-link-icon si si-settings"></i>
                                    <span className="nav-main-link-name">Profile</span>
                                </Link>
                            </li>
                            <li className="nav-main-heading">Shortcuts</li>
                            {/*<div className="nav-main-itemdropdown d-inline-block ms-2 ms-lg-auto">*/}
                            {/*    <button type="button" className="btn btn-sm btn-alt-secondary d-flex align-items-center" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                            {/*        <img className="rounded-circle" src="/assets/media/avatars/avatar.jpg" alt="" style={{ width: "21px" }} />*/}
                            {/*        <span className="d-none d-sm-inline-block ms-2">John</span>*/}
                            {/*        <i className="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1 mt-1"></i>*/}
                            {/*    </button>*/}
                            {/*    <div className="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0" aria-labelledby="page-header-user-dropdown" >*/}
                            {/*        <div className="p-2">*/}
                            {/*            <a className="dropdown-item d-flex align-items-center justify-content-between">*/}
                            {/*                <span className="fs-sm fw-medium">Profile</span>*/}
                            {/*                <span className="badge rounded-pill bg-primary ms-2">1</span>*/}
                            {/*            </a>*/}
                            {/*        </div>*/}
                            {/*        <div role="separator" className="dropdown-divider m-0"></div>*/}
                            {/*        <div className="p-2">*/}
                            {/*            <Link to={'/'} className="dropdown-item d-flex align-items-center justify-content-between">*/}
                            {/*                <span className="fs-sm fw-medium">Log Out</span>*/}
                            {/*            </Link>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <li className="nav-main-item ms-lg-auto">
                                <a className="nav-main-link">
                                    <button type="button" className="btn btn-alt-info" data-bs-toggle="modal" data-bs-target="#group-add-modal">
                                        <i className="fa fa-fw fa-plus me-1"></i> Create group
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
