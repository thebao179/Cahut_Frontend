import React from "react";
import {useForm} from "react-hook-form";
import slideApi from "../../api/SlideApi";

function SlideTypeChoose({presentationId, presRefresh, setPresRefresh}) {
    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        let result;
        if (data.slideType === 'multiplechoice') result = await slideApi.createMultipleChoiceSlide(presentationId);
        // eslint-disable-next-line no-undef
        One.helpers('jq-notify', {
            type: `${result.status === true ? 'success' : 'danger'}`,
            icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
            message: result.message
        });
        if (result.status) setPresRefresh(presRefresh + 1);
    }

    return (
        <div className="modal fade" id="slide-add-modal" role="dialog"
             aria-labelledby="slide-add-modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-popin" role="document">
                <div className="modal-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="block block-rounded block-transparent mb-0">
                            <div className="block-header block-header-default">
                                <h3 className="block-title">Add new slide</h3>
                                <div className="block-options">
                                    <button type="button" className="btn-block-option" data-bs-dismiss="modal"
                                            aria-label="Close">
                                        <i className="fa fa-fw fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="block-content fs-sm">
                                <div className="mb-4">
                                    <label className="form-label modal-title text-danger mb-1">Slide Type</label>
                                    <select className="form-select" {...register("slideType")}>
                                        <option value="multiplechoice">Multiple Choice</option>
                                        <option value="heading">Heading</option>
                                        <option value="paragraph">Paragraph</option>
                                    </select>
                                </div>
                            </div>
                            <div className="block-content block-content-full text-end bg-body">
                                <button type="button" className="btn btn-sm btn-alt-secondary me-1 close"
                                        data-bs-dismiss="modal">Close
                                </button>
                                <button type="submit" className="btn btn-sm btn-primary">Confirm
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SlideTypeChoose;
