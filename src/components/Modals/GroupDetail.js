/* eslint-disable */
import React, {useEffect, useRef, useState} from "react";
import groupApi from "../../api/GroupApi";

function validateEmail(email) {
    const str = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return str.test(email);
}

function GroupDetail({groupId, role, self, setGrpRefresh, grpRefresh, connection}) {
    const [data, setData] = useState([]);
    const [invitation, setInvitation] = useState();
    const [present, setPresent] = useState({});
    let idChanged = useRef(false);

    useEffect(() => {
        if (connection && groupId) {
            connection.on("NotifyGroup", (notifyInfo) => {
                getPresentation();
            });
        }
    }, [connection, groupId])

    useEffect(() => {
        async function fetchData() {
            const groupInv = await groupApi.getInvitationLink(groupId);
            const groupMems = await groupApi.getGroupMembers(groupId);
            setData(groupMems.data);
            setInvitation(groupInv.data);
        }
        if (idChanged.current) {
            if (!DataTable.isDataTable('#group-members'))
                $('#group-members').DataTable({
                    pageLength: 10,
                    lengthMenu: !1,
                    searching: !1,
                    autoWidth: !1,
                    dom: "<'row'<'col-sm-12'tr>><'row'<'col-sm-6'i><'col-sm-6'p>>",
                    destroy: true,
                    bInfo: false,
                });
            idChanged.current = false;
        } else if (groupId && !idChanged.current) {
            fetchData();
            getPresentation();
            $('#group-select2').select2({
                placeholder: 'Enter To Add',
                tags: true,
                multiple: true,
                createTag: function (term, data) {
                    const value = term.term;
                    if (validateEmail(value))
                        return {
                            id: value,
                            text: value
                        };
                    return null;
                },
                selectOnClose: true,
            });
            $('#group-select2').val(null).trigger('change');
            idChanged.current = true;
        }
    }, [groupId, data]);

    const getPresentation = async () => {
        const result = await groupApi.getPresentation(groupId);
        if (result.status) setPresent(result.data);
        else setPresent({});
    }

    if (DataTable.isDataTable('#group-members'))
        $('#group-members').DataTable().destroy();

    const copyInv = () => {
        const copyText = document.getElementById('group-link');
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
    };

    const sendInv = () => {
        const value = $('#group-select2').val();
        if (value.length) {
            groupApi.inviteMembers(groupId, value).then(result => {
                One.helpers('jq-notify', {
                    type: `${result.status === true ? 'success' : 'danger'}`,
                    icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
                    message: result.message
                });
                $('#group-select2').val(null).trigger('change');
            });
            One.helpers('jq-notify', {type: 'info', icon: 'fa fa-info-circle me-1', message: 'Sending'});
        }
    }

    const handleRemoveClick = async (groupName, email) => {
        const result = await groupApi.kickMember(groupName, email);

        if (result.status) {
            setData([]);
            setGrpRefresh(grpRefresh + 1);
        }

        One.helpers('jq-notify', {
            type: `${result.status === true ? 'success' : 'danger'}`,
            icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
            message: result.message
        });
    }

    const handleRoleChange = async (e) => {
        const role = e.target.value;
        const email = e.target.id;
        const result = await groupApi.setRoleMember(groupId, role, email);
        One.helpers('jq-notify', {
            type: `${result.status === true ? 'success' : 'danger'}`,
            icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
            message: result.message
        });
    }

    return (
        <>
            <div className="modal fade" id="grpdetail-modal" role="dialog"
                 aria-labelledby="grpdetail-modal" aria-hidden="true">
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
                                {(present.role === "Owner" || present.role === "Co-owner") &&
                                    <a href={'/presentation/present/' + present.presentationId}>
                                        <button type="button" className="btn btn-warning me-1 mb-3">
                                            <i className="fa fa-fw fa-display me-1"></i> Go To Presentation
                                        </button>
                                    </a>
                                }
                                {present.role === "Member" &&
                                    <a href={'/view/' + present.presentationId}>
                                        <button type="button" className="btn btn-warning me-1 mb-3">
                                            <i className="fa fa-fw fa-display me-1"></i> Go To Presentation
                                        </button>
                                    </a>
                                }
                                <div className="mb-4">
                                    <label className="form-label modal-title text-info mb-1">Group Invitation</label>
                                    <div className="input-group">
                                        <input className="form-control" id="group-link"
                                               defaultValue={invitation} disabled={true}/>
                                        <button type="button" className="btn btn-secondary"
                                                data-bs-toggle="tooltip" data-bs-placement="top"
                                                title="Copy to clipboard"
                                                onClick={copyInv}>
                                            <i className="far fa-copy"></i>
                                        </button>
                                    </div>
                                </div>
                                {(role === 'Owner' || role === 'Co-owner') &&
                                    <div className="mb-4">
                                        <label className="form-label modal-title text-info mb-1">Invite By Email</label>
                                        <select className="js-select2 form-select" id="group-select2"
                                                name="" style={{width: '100%'}}
                                                data-container="#grpdetail-modal">
                                        </select>
                                        <div className="row justify-content-end">
                                            <div className="col-md-3 text-end">
                                                <button type="button" className="btn btn-alt-primary mt-3"
                                                        onClick={sendInv}>
                                                    <i className="fa fa-fw fa-paper-plane me-1"></i> Send
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="mb-4" id="member-table">
                                    <label className="modal-title text-info mb-1">Members</label>
                                    <table className="table table-bordered table-striped table-vcenter"
                                           id="group-members">
                                        <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th className="d-none d-sm-table-cell" style={{width: "30%"}}>Email</th>
                                            <th className="d-none d-sm-table-cell" style={{width: "20%"}}>Role</th>
                                            <th data-orderable="false" style={{width: "10%"}}></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.map(e =>
                                            <tr key={e.email} id={`row_${e.email}`}>
                                                <td className="fw-semibold fs-sm">{e.memberName}</td>
                                                <td className="d-none d-sm-table-cell fs-sm">{e.email}</td>
                                                <td className="d-none d-sm-table-cell">
                                                    {e.role === 'Owner' || role !== 'Owner' ? <span
                                                            className={`fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill ${e.role === 'Owner' ? 'bg-danger-light text-danger' : e.role === 'Co-owner' ? 'bg-warning-light text-warning' : 'bg-success-light text-success'}`}>{e.role}</span> :
                                                        <select className="form-select" id={e.email}
                                                                onChange={handleRoleChange}>
                                                            <option value="Co-owner"
                                                                    selected={e.role === 'Co-owner'}>Co-Owner
                                                            </option>
                                                            <option value="Member"
                                                                    selected={e.role === 'Member'}>Member
                                                            </option>
                                                        </select>}
                                                </td>
                                                <td>
                                                    {e.role !== 'Owner' && (role === 'Owner' || role === 'Co-owner') && self !== e.email ?
                                                        <button type="button"
                                                                className="text-center btn btn-sm btn-danger removeBtn"
                                                                onClick={() => handleRemoveClick(groupId, e.email)}>
                                                            <i className="fa fa-fw fa-xmark"></i>
                                                        </button> : ''}
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

        </>
    );
}

export default GroupDetail;