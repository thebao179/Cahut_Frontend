/* eslint-disable */
import React from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import groupApi from "../../api/GroupApi";

const GroupAddSchema = yup.object().shape({
    title: yup.string().required("Title is a required field"),
});

function GroupAdd({grpCreate, setGrpCreate}) {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(GroupAddSchema)
    });


    const onSubmit = async (data) => {
        const result = await groupApi.createGroup(data.title);
        One.helpers('jq-notify', {
            type: `${result.status === true ? 'success' : 'danger'}`,
            icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
            message: result.message
        });
        if (result.status) setGrpCreate(grpCreate + 1);
    }

    return (
        <div className="modal fade" id="group-add-modal" role="dialog"
             aria-labelledby="group-add-modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-popin" role="document">
                <div className="modal-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="block block-rounded block-transparent mb-0">
                            <div className="block-header block-header-default">
                                <h3 className="block-title">Create new group</h3>
                                <div className="block-options">
                                    <button type="button" className="btn-block-option" data-bs-dismiss="modal"
                                            aria-label="Close">
                                        <i className="fa fa-fw fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="block-content fs-sm">
                                <div className="mb-4">
                                    <label className="form-label modal-title text-danger mb-1">Title</label>
                                    <input type="text" className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                           name="example-text-input"
                                           placeholder="Your Group Name"
                                           {...register("title")} />
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

export default GroupAdd;
