import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PanelHero from "../General/PanelHero";
import groupApi from "../../api/GroupApi";

function Dashboard({token, grpCreate}) {
    const [data, setData] = useState({});

    useEffect(() => {
        async function fetchData() {
            const result = await groupApi.getGroupNumber();
            setData(result.data)
        }

        if (token) fetchData();
    }, [grpCreate]);

    return (
        <>
            <PanelHero title={'Dashboard'} desc={'Welcome to our app'}/>
            <div className="content">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="block block-rounded">
                            <div className="block-content pb-4">
                                <div className="text-center">
                                    <div className="block block-rounded d-flex flex-column h-100 mb-0">
                                        <div
                                            className="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
                                            <dl className="mb-0">
                                                <dt className="fs-3 fw-bold">{data.groupsIsOwner}</dt>
                                                <dd className="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                                                    Owned Groups
                                                </dd>
                                            </dl>
                                            <div className="item item-rounded-lg bg-body-light">
                                                <i className="fa fa-user-group fs-3 text-primary"></i>
                                            </div>
                                        </div>
                                        <div className="bg-body-light rounded-bottom">
                                            <Link to={'/groups/owned'}
                                                  className="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between">
                                                <span>View owned groups</span>
                                                <i className="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="block block-rounded">
                            <div className="block-content pb-4">
                                <div className="text-center">
                                    <div className="block block-rounded d-flex flex-column h-100 mb-0">
                                        <div
                                            className="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
                                            <dl className="mb-0">
                                                <dt className="fs-3 fw-bold">{data.groupsIsNotOwner}</dt>
                                                <dd className="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                                                    Joined Groups
                                                </dd>
                                            </dl>
                                            <div className="item item-rounded-lg bg-body-light">
                                                <i className="fa fa-users fs-3 text-primary"></i>
                                            </div>
                                        </div>
                                        <div className="bg-body-light rounded-bottom">
                                            <Link to={'/groups/joined'}
                                                  className="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between">
                                                <span>View joined groups</span>
                                                <i className="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="block block-rounded">
                            <div className="block-content pb-4">
                                <div className="text-center">
                                    <div className="block block-rounded d-flex flex-column h-100 mb-0">
                                        <div
                                            className="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center">
                                            <dl className="mb-0">
                                                <dt className="fs-3 fw-bold">0</dt>
                                                <dd className="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                                                    Presentations
                                                </dd>
                                            </dl>
                                            <div className="item item-rounded-lg bg-body-light">
                                                <i className="fa fa-display fs-3 text-primary"></i>
                                            </div>
                                        </div>
                                        <div className="bg-body-light rounded-bottom">
                                            <Link to={'/presentations'}
                                                  className="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between">
                                                <span>View presentations</span>
                                                <i className="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;