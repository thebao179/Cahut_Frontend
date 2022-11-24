/* eslint-disable */
import React, {useEffect, useState} from "react";

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function createTable(data, role) {
    document.getElementById('member-table').innerHTML = '';
    document.getElementById('member-table').innerHTML += ('<table class="table table-bordered table-striped table-vcenter" id="group-members">\n' +
        '<thead>\n' +
        '<tr>\n' +
        '<th>Username</th>\n' +
        '<th class="d-none d-sm-table-cell" style="width: 30%">Email</th>\n' +
        '<th class="d-none d-sm-table-cell" style="width: 20%">Role</th>\n' +
        '<th data-orderable="false" style="width: 10%"></th>\n' +
        '</tr>\n' +
        '</thead>\n' +
        '</table>\n')
    const rows = data.map(e => {
        return (
            '<tr>\n' +
            `<td class="fw-semibold fs-sm">${e.username}</td>\n` +
            '<td class="d-none d-sm-table-cell fs-sm">\n' +
            `${e.email}\n` +
            '</td>\n' +
            '<td class="d-none d-sm-table-cell">\n' +
            `${role === 3 ? '<span class="fs-xs fw-semibold d-inline-block py-1 px-3 rounded-pill bg-warning-light text-warning">Owner</span>\n' : '<select class="form-select" onchange="changeRole(0)">\n' + 
                '<option value="1">Co-Owner</option>\n' +
                '<option value="2">Member</option>\n' + 
                '</select>\n'}` +
            '</td>\n' +
            '<td>\n' +
            `${(role !== 3 && role !== 0) ? `<button type="button" class="text-center btn btn-sm btn-danger" onclick="removeMember(0)">\n` +
                '<i class="fa fa-fw fa-xmark"></i>\n' +
                '</button>\n' : ''}` +
            '</td>\n' +
            '</tr>\n'
        );
    });
    document.getElementById('group-members').innerHTML += ('<tbody>\n' + rows + '</tbody>\n');
    document.getElementById('group-members').removeChild(document.getElementById('group-members').lastChild);
}

function GroupDetail({ groupId, role }) {
    const [data, setData] = useState([
        {username: 'Amber Harvey', email: 'user1@gmail.com', role: 2},
        {username: 'Peter Parker', email: 'user2@gmail.com', role: 1},
        {username: 'Trong Le', email: 'user3@gmail.com', role: 3},
    ]);

    useEffect(() => {
        if (groupId > 0) {
            $('#group-select2').select2({
                placeholder: 'Enter To Add',
                tags: true,
                multiple: true,
                createTag: function (term, data) {
                    var value = term.term;
                    if (validateEmail(value)) {
                        return {
                            id: value,
                            text: value
                        };
                    }
                    return null;
                }
            });
            $('#group-select2').val(null).trigger('change');
            createTable(data, role);
            $('#group-members').DataTable({
                pageLength: 10,
                lengthMenu: !1,
                searching: !1,
                autoWidth: !1,
                dom: "<'row'<'col-sm-12'tr>><'row'<'col-sm-6'i><'col-sm-6'p>>",
                destroy: true,
            });
            var memTable = $('#group-members').DataTable();
            $('#group-members').on('click', '.btn-danger', function () {
                memTable.row($(this).parents('tr'))
                    .remove()
                    .draw();
            });
        }
    }, [groupId]);

    const copyInv = () => {
        const copyText = document.getElementById('group-link');
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        One.helpers('jq-notify', {type: 'info', icon: 'fa fa-info-circle me-1', message: 'Copied to clipboard'});
    };

    const sendInv = () => {
        One.helpers('jq-notify', {type: 'info', icon: 'fa fa-info-circle me-1', message: 'Sending emails'});
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
                                                name="" style={{width: '100%'}}
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