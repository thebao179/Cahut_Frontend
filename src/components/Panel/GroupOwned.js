import React, {useState} from "react";
import PanelHero from "../General/PanelHero";
import GroupDetail from "../Modals/GroupDetail";

function GroupOwned() {
    const [groupId, setGroupId] = useState(0);

    return (
        <>
            <PanelHero title={'Owned groups'} photo={'gowned'} />
            <div className="content content-boxed">
                <div className="row items-push py-4">
                    <div className="col-md-6 col-lg-4 col-xl-3">
                        <a className="block block-rounded block-link-pop h-100 mb-0">
                            <div className="block-content block-content-full text-center bg-city">
                                <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                                    <i className="fa fa-users fa-2x text-white-75"></i>
                                </div>
                                <div className="fs-sm text-white-75">
                                    10 users
                                </div>
                            </div>
                            <div className="block-content block-content-full">
                                <h4 className="h5 mb-1">
                                    Study Javascript
                                </h4>
                                <div className="fs-sm text-end">
                                    <div className="block-options">
                                        <button type="button" className="btn-block-option">
                                            <i className="si si-settings"></i>
                                        </button>
                                        <button type="button" className="btn-block-option"
                                                data-bs-toggle="modal" data-bs-target="#grpdetail-modal"
                                                onClick={() => {setGroupId(1)}}>
                                            <i className="si si-info"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-6 col-lg-4 col-xl-3">
                        <a className="block block-rounded block-link-pop h-100 mb-0">
                            <div className="block-content block-content-full text-center bg-city">
                                <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                                    <i className="fa fa-users fa-2x text-white-75"></i>
                                </div>
                                <div className="fs-sm text-white-75">
                                    5 users
                                </div>
                            </div>
                            <div className="block-content block-content-full">
                                <h4 className="h5 mb-1">
                                    Study PHP
                                </h4>
                                <div className="fs-sm text-end">
                                    <div className="block-options">
                                        <button type="button" className="btn-block-option">
                                            <i className="si si-settings"></i>
                                        </button>
                                        <button type="button" className="btn-block-option"
                                                data-bs-toggle="modal" data-bs-target="#grpdetail-modal"
                                                onClick={() => {setGroupId(2)}}>
                                            <i className="si si-info"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <GroupDetail groupId={groupId} role={0} />
        </>
    );
}

export default GroupOwned;
