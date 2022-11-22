import React from "react";
import SignInForm from "../components/Authentication/SignInForm";
import SignUpForm from "../components/Authentication/SignUpForm";

function Authentication() {
    return (
        <div id="page-container">
            <main id="main-container">
                <div className="bg-image" style={{backgroundImage: 'url("/assets/media/photos/auth-photo@2x.jpg")'}}>
                    <div className="row g-0 bg-primary-dark-op">
                        <div className="hero-static col-lg-4 d-none d-lg-flex flex-column justify-content-center">
                            <div className="p-4 p-xl-5 flex-grow-1 d-flex align-items-center">
                                <div className="w-100">
                                    <a className="link-fx fw-semibold fs-2 text-white">
                                        Realtime Learning Platform
                                    </a>
                                    <p className="text-white-75 me-xl-8 mt-2" />
                                </div>
                            </div>
                            <div className="p-4 p-xl-5 d-xl-flex justify-content-between align-items-center fs-sm">
                                <p className="fw-medium text-white-50 mb-0">
                                    <strong>HCMUS</strong> ©
                                    <span data-toggle="year-copy" className="js-year-copy-enabled">
                                        2022
                                    </span>
                                </p>
                                <ul className="list list-inline mb-0 py-2">
                                    <li className="list-inline-item">
                                        <a className="text-white-75 fw-medium">Contact</a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a className="text-white-75 fw-medium">About us</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="hero-static col-lg-8 d-flex flex-column align-items-center bg-body-extra-light">
                            <div className="p-3 w-100 d-lg-none text-center">
                                <a className="link-fx fw-semibold fs-3 text-dark">
                                    Realtime Learning Platform
                                </a>
                            </div>
                            <div className="p-4 w-100 flex-grow-1 d-flex align-items-center">
                                <SignInForm />
                            </div>
                            <div className="px-4 py-3 w-100 d-lg-none d-flex flex-column flex-sm-row justify-content-between fs-sm text-center text-sm-start">
                                <p className="fw-medium text-black-50 py-2 mb-0">
                                    <strong>HCMUS</strong> ©
                                    <span data-toggle="year-copy" className="js-year-copy-enabled">
                                        2022
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Authentication;
