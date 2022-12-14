import PanelHero from "../General/PanelHero";
import React, {useEffect, useState} from "react";
import presentationApi from "../../api/PresentationApi";
import {Link} from "react-router-dom";

function PresentationCollab() {
    const [presentations, setPresentations] = useState();

    useEffect(() => {
        async function fetchData() {
            const result = await presentationApi.getCollabPresentation();
            const data = result.data.map(presentation =>
                <div key={presentation.presentationId} className="col-md-6 col-lg-4 col-xl-3">
                    <Link to={'/presentation/edit/' + presentation.presentationId}
                          className="block block-rounded block-link-pop h-100 mb-0">
                        <div className="block-content block-content-full text-center bg-info">
                            <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                                <i className="fa fa-desktop fa-2x text-white-75"></i>
                            </div>
                            <div className="fs-sm text-white-75">
                                {presentation.numOfSlides} Slides
                            </div>
                        </div>
                        <div className="block-content block-content-full">
                            <h4 className="h5 mb-1">
                                {presentation.presentationName}
                            </h4>
                        </div>
                    </Link>
                </div>
            );
            setPresentations(data);
        }

        fetchData();
    }, []);

    return (
        <>
            <PanelHero title={'Collaborated Presentations'} photo={'pcollab'}/>
            <div className="content content-boxed">
                <div className="row items-push py-4">
                    {presentations}
                </div>
            </div>
        </>
    );
}

export default PresentationCollab;
