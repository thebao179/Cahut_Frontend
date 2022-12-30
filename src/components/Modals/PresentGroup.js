import React, {useEffect, useState} from "react";
import groupApi from "../../api/GroupApi";
import presentationApi from "../../api/PresentationApi";

function PresentGroup({presentationId, setIsPresent}) {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await groupApi.getOwnedGroups();
            setGroups(data.data);
        }
        fetchData();
    }, []);

    const presentGroup = async (groupName) => {
        const result = await presentationApi.presentGroup(presentationId, groupName);
        if (result.status) {
            setIsPresent(true);
            window.location.href = '/presentation/present/' + presentationId;
        }
        else {
            // eslint-disable-next-line no-undef
            One.helpers('jq-notify', {
                type: `${result.status === true ? 'success' : 'danger'}`,
                icon: `${result.status === true ? 'fa fa-check me-1' : 'fa fa-times me-1'}`,
                message: result.message
            });
        }
    }

    return (
        <div className="modal fade" id="grouppresent-modal" role="dialog"
             aria-labelledby="grouppresent-modal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-popin" role="document">
                <div className="modal-content">
                    <div className="block block-rounded block-transparent mb-0">
                        <div className="block-header block-header-default">
                            <h3 className="block-title">Group Present</h3>
                            <div className="block-options">
                                <button type="button" className="btn-block-option" data-bs-dismiss="modal"
                                        aria-label="Close">
                                    <i className="fa fa-fw fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div className="block-content fs-sm">
                            <table className="table table-striped table-vcenter table-borderless table-sm">
                                <thead>
                                <tr>
                                    <th className="text-info modal-title fw-bold">Group Name</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {groups.map(group =>
                                    <tr key={group.groupName}>
                                        <td className="fw-semibold fs-sm">
                                            {group.groupName}
                                        </td>
                                        <td className="text-end">
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-alt-primary" onClick={() => presentGroup(group.groupName)}>
                                                    <i className="fa fa-fw fa-display"></i> Present
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
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
    );
}

export default PresentGroup;
