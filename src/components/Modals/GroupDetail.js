/* eslint-disable */
import React, { useEffect, useState } from "react";
import groupApi from "../../api/GroupApi";
import GroupMembers from "./GroupMembers";

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function GroupDetail({ groupId, role }) {
    const [data, setData] = useState([
        { username: 'Amber Harvey', email: 'user1@gmail.com', role: 2 },
        { username: 'Peter Parker', email: 'user2@gmail.com', role: 1 },
        { username: 'Trong Le', email: 'user3@gmail.com', role: 3 },
    ]);


    const copyInv = () => {
        const copyText = document.getElementById('group-link');
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        One.helpers('jq-notify', { type: 'info', icon: 'fa fa-info-circle me-1', message: 'Copied to clipboard' });
    };

    const sendInv = () => {
        One.helpers('jq-notify', { type: 'info', icon: 'fa fa-info-circle me-1', message: 'Sending emails' });
    }

    const handleRemoveClick = (groupName, email) => {
        console.log(groupName);
        console.log(email);
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
                                <div className="mb-4">
                                    <label className="form-label modal-title text-info mb-1">Group Invitation</label>
                                    <div className="input-group">
                                        <input className="form-control" id="group-link"
                                            value={'https://www.google.com.vn'} disabled={true} />
                                        <button type="button" className="btn btn-secondary"
                                            data-bs-toggle="tooltip" data-bs-placement="top" title="Copy to clipboard"
                                            onClick={copyInv}>
                                            <i className="far fa-copy"></i>
                                        </button>
                                    </div>
                                </div>
                                {(role !== 3 && role !== 0) &&
                                    <div className="mb-4">
                                        <label className="form-label modal-title text-info mb-1">Invite By Email</label>
                                        <select className="js-select2 form-select" id="group-select2"
                                            name="" style={{ width: '100%' }}
                                            data-container="#grpdetail-modal">
                                        </select>
                                        <div className="row justify-content-end">
                                            <div className="col-md-3 text-end">
                                                <button type="button" className="btn btn-alt-primary mt-3" onClick={sendInv}>
                                                    <i className="fa fa-fw fa-paper-plane me-1"></i> Send
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="mb-4" id="member-table">
                                    <label className="modal-title text-info mb-1">Members</label>
                                    <GroupMembers groupName = {groupId} data={data} role={role} handleRemoveBtnClick={handleRemoveClick}/>
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