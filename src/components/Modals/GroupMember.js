import React, {useEffect} from "react";
import $ from 'jquery'

function GroupMember({ groupId }) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/assets/js/pages/be_tables_datatables.min.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);
    return (
        <>
            <div className="modal fade" id="member-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="member-modal" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-popin" role="document">
                    <div className="modal-content">
                        <div className="block block-rounded block-transparent mb-0">
                            <div className="block-header block-header-default">
                                <h3 className="block-title">Group Detail</h3>
                                <div className="block-options">
                                    <button type="button" className="btn-block-option" data-bs-dismiss="modal"
                                            aria-label="Close">
                                        <i className="fa fa-fw fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="block-content fs-sm">
                                <table className="table table-bordered table-striped table-vcenter js-dataTable-simple">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th className="d-none d-sm-table-cell" style={{width: 30 + '%'}}>Email</th>
                                            <th className="d-none d-sm-table-cell" style={{width: 20 + '%'}}>Role</th>
                                            <th data-orderable="false" style={{width: 10 + 'px'}}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="fw-semibold fs-sm">Amber Harvey</td>
                                            <td className="d-none d-sm-table-cell fs-sm">
                                                client1<span className="text-muted">@example.com</span>
                                            </td>
                                            <td className="d-none d-sm-table-cell">
                                                <span className="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-warning-light text-warning">Owner</span>
                                            </td>
                                            <td>
                                                <button type="button" className="text-center btn btn-sm btn-danger">
                                                    <i className="fa fa-fw fa-xmark"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="fw-semibold fs-sm">Melissa Rice</td>
                                            <td className="d-none d-sm-table-cell fs-sm">
                                                client2<span className="text-muted">@example.com</span>
                                            </td>
                                            <td className="d-none d-sm-table-cell">
                                                <span className="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-info-light text-info">Co-Owner</span>
                                            </td>
                                            <td>
                                                <button type="button" className="text-center btn btn-sm btn-danger">
                                                    <i className="fa fa-fw fa-xmark"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="fw-semibold fs-sm">Carol White</td>
                                            <td className="d-none d-sm-table-cell fs-sm">
                                                client3<span className="text-muted">@example.com</span>
                                            </td>
                                            <td className="d-none d-sm-table-cell">
                                                <span className="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-success-light text-success">Member</span>
                                            </td>
                                            <td>
                                                <button type="button" className="text-center btn btn-sm btn-danger">
                                                    <i className="fa fa-fw fa-xmark"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="block-content block-content-full text-end bg-body">
                                <button
                                    type="button" className="btn btn-sm btn-alt-secondary me-1"
                                    data-bs-dismiss="modal">Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GroupMember;