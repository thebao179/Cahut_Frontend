/* eslint-disable */
import React, {useEffect, useState} from "react";
import PanelHero from "../General/PanelHero";
import presentationApi from "../../api/PresentationApi";
import {Link} from "react-router-dom";
import PresentationCollabList from "../Modals/PresentationCollabList";

function PresentationOwned({presentationsCreate}) {
    const [presentations, setPresentations] = useState();
    const [refresh, setRefresh] = useState(0);
    const [presentationId, setPresentationId] = useState();

    useEffect(() => {
        async function fetchData() {
            const result = await presentationApi.getPresentation();
            const data = result.data.map(presentation =>
                <div key={presentation.presentationId} className="col-md-6 col-lg-4 col-xl-3">
                    <a className="block block-rounded block-link-pop h-100 mb-0">
                        <Link to={'/presentation/edit/' + presentation.presentationId}>
                            <div className="block-content block-content-full text-center bg-warning">
                                <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                                    <i className="fa fa-desktop fa-2x text-white-75"></i>
                                </div>
                                <div className="fs-sm text-white-75">
                                    {presentation.numOfSlides} Slides
                                </div>
                            </div>
                        </Link>
                        <div className="block-content block-content-full">
                            <h4 className="h5 mb-1">
                                {presentation.presentationName}
                            </h4>
                            <div className="fs-sm text-end">
                                <div className="block-options">
                                    <button type="button" className="btn-block-option"
                                            data-bs-toggle="modal" data-bs-target="#presentation-modal"
                                            onClick={() => {
                                                setPresentationId(presentation.presentationId);
                                            }}>
                                        <i className="si si-info text-info fw-bold"></i>
                                    </button>
                                    <button type="button" className="btn-block-option"
                                            onClick={() => deletePresentation(presentation.presentationName)}>
                                        <i className="si si-trash text-danger fw-bold"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            );
            setPresentations(data);
        }

        fetchData();
    }, [presentationsCreate, refresh]);

    const deletePresentation = (presentationName) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4c78dd',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const result = await presentationApi.deletePresentation(presentationName);
                One.helpers('jq-notify', {
                    type: `${result.status === true ? 'success' : 'danger'}`,
                    icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
                    message: result.message
                });
                if (result.status) setRefresh(refresh + 1);
            }
        })
    }

    return (
        <>
            <PanelHero title={'Owned Presentations'} photo={'powned'}/>
            <div className="content content-boxed">
                <div className="row items-push py-4">
                    {presentations}
                </div>
            </div>
            <PresentationCollabList pId={presentationId}/>
        </>
    );
}

export default PresentationOwned;