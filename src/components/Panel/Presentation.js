/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import PanelHero from "../General/PanelHero";
import presentationApi from "../../api/PresentationApi";
import {Link} from "react-router-dom";

function Presentations({ token, presentationsCreate }) {
    const [presentations, setPresentations] = useState();
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const result = await presentationApi.getPresentation();
            const data = result.data.map(presentation =>
                <div key={presentation.presentationId} className="col-md-6 col-lg-4 col-xl-3">
                    <Link to={''} className="block block-rounded block-link-pop h-100 mb-0">
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
                                    <button type="button" className="btn-block-option" onClick={() => deletePresentation(presentation.presentationName)}>
                                        <i className="si si-trash text-danger fw-bold"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            );
            setPresentations(data);
        }

        if (token) fetchData();
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
            <PanelHero title={'Presentations'} photo={'presentation'} />
            <div className="content content-boxed">
                <div className="row items-push py-4">
                    {presentations}
                </div>
            </div>
        </>
    );
}

export default Presentations;