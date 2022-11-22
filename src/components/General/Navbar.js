import React from "react";

function Navbar() {
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
                            <li className="nav-main-item">
                                <a className="nav-main-link">
                                    <i className="nav-main-link-icon si si-settings"></i>
                                    <span className="nav-main-link-name">Profile</span>
                                </a>
                            </li>
                            <li className="nav-main-heading">Shortcuts</li>
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
