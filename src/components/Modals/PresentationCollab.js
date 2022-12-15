/* eslint-disable */
import React, {useEffect, useRef, useState} from "react";

function validateEmail(email) {
    const str = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return str.test(email);
}

function PresentationCollab({pId}) {
    let idChanged = useRef(false);
    const [data, setData] = useState([
        {username: 'Trong Le', email: 'quoctrongle2001@gmail.com'},
        {username: 'Trong Le1', email: 'quoctrongle2001@gmail.com'},
        {username: 'Trong Le2', email: 'quoctrongle2001@gmail.com'},
    ]);

    useEffect(() => {
        if (data.length !== 0 && idChanged.current) {
            if (!DataTable.isDataTable('#presentation-collabs'))
                $('#presentation-collabs').DataTable({
                    pageLength: 10,
                    lengthMenu: !1,
                    searching: !1,
                    autoWidth: !1,
                    dom: "<'row'<'col-sm-12'tr>><'row'<'col-sm-6'i><'col-sm-6'p>>",
                    destroy: true,
                });
            idChanged.current = false;
        } else if (pId && !idChanged.current) {
            setData([
                {username: `Trong Le ${pId}`, email: 'quoctrongle2001@gmail.com'},
                {username: 'Trong Le1', email: 'quoctrongle2001@gmail.com'},
                {username: 'Trong Le2', email: 'quoctrongle2001@gmail.com'},
            ]);
            $('#presentation-select2').select2({
                placeholder: 'Enter Email',
                tags: true,
                multiple: true,
                createTag: function (term, data) {
                    const value = term.term;
                    if (validateEmail(value)) {
                        return {
                            id: value,
                            text: value
                        };
                    }
                    return null;
                },
            });
            idChanged.current = true;
        }
    }, [pId, data]);

    return (
        <div className="modal fade" id="presentation-modal" role="dialog"
             aria-labelledby="presentation-modal" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-popin" role="document">
                <div className="modal-content">
                    <div className="block block-rounded block-transparent mb-0">
                        <div className="block-header block-header-default">
                            <h3 className="block-title">Presentation Collaborators</h3>
                            <div className="block-options">
                                <button type="button" className="btn-block-option" data-bs-dismiss="modal"
                                        aria-label="Close">
                                    <i className="fa fa-fw fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="block-content fs-sm">
                            <div className="mb-4">
                                <label className="form-label modal-title text-info mb-1">Add collaborator</label>
                                <select className="js-select2 form-select" id="presentation-select2"
                                        name="" style={{width: '100%'}}
                                        data-container="#presentation-modal">
                                </select>
                                <div className="row justify-content-end">
                                    <div className="col-md-3 text-end">
                                        <button type="button" className="btn btn-alt-success mt-3">
                                            <i className="fa fa-fw fa-plus me-1"></i> Add people
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4" id="collab-table">
                                <label className="modal-title text-info mb-1">Collaborators</label>
                                <table className="table table-bordered table-striped table-vcenter"
                                       id="presentation-collabs">
                                    <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th className="d-none d-sm-table-cell" style={{width: "30%"}}>Email</th>
                                        <th data-orderable="false" style={{width: "8%"}}></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map(e =>
                                        <tr key={e.email} id={`row_${e.email}`}>
                                            <td className="fw-semibold fs-sm">{e.username}</td>
                                            <td className="d-none d-sm-table-cell fs-sm">{e.email}</td>
                                            <td>
                                                <button type="button" className="text-center btn btn-sm btn-danger">
                                                    <i className="fa fa-fw fa-xmark"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
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
    );
}

export default PresentationCollab;
