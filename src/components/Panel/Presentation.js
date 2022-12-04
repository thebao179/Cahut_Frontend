/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import jwt from 'jwt-decode';
import PanelHero from "../General/PanelHero";
import groupApi from "../../api/GroupApi";
import { Image } from "react-bootstrap";

function Presentations({ token, presentationsCreate }) {
    const [presentationId, setPresentationId] = useState();
    const [presentations, setPresentations] = useState();

    const deletePresentation = (pId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4c78dd',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

            }
        })
    }

    useEffect(() => {
        async function fetchData() {
            const data = await groupApi.getOwnedGroups();
            const temp = data.data.map(presentation =>
                <div key={presentation.groupName} className="col-md-6 col-lg-4 col-xl-3">
                    <a className="block block-rounded block-link-pop h-100 mb-0">
                        <div className="block-content block-content-full text-center bg-city">
                            <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                                <i className="fa fa-desktop fa-2x text-white-75"></i>
                            </div>
                            <div className="fs-sm text-white-75">
                                {presentation.numOfMems} Slides
                            </div>
                        </div>
                        <div className="block-content block-content-full">
                            <h4 className="h5 mb-1">
                                {presentation.groupName}
                            </h4>
                            <div className="fs-sm text-end">
                                <div className="block-options">
                                    <button type="button" className="btn-block-option" onClick={() => deletePresentation(0)}>
                                        <i className="si si-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            );
            setPresentations(temp);
        }

        if (token) fetchData();
    }, [presentationsCreate]);
    return (
        <>
            <PanelHero title={'Presentations'} photo={'presentations'} />
            <div className="content content-boxed">
                <div className="row items-push py-4">
                    {presentations}
                </div>
            </div>
        </>
    );
}

export default Presentations;