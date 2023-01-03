import React, {useEffect, useRef, useState} from "react";
import PanelHero from "../General/PanelHero";
import GroupDetail from "../Modals/GroupDetail";
import groupApi from "../../api/GroupApi";
import jwt from 'jwt-decode';

function GroupJoined({grpCreate, connection}) {
    const [groupId, setGroupId] = useState();
    const [role, setRole] = useState(0);
    const [groups, setGroups] = useState();
    const [self, setSelf] = useState();
    const [grpRefresh, setGrpRefresh] = useState(0);
    const accessToken = useRef(JSON.parse(localStorage.getItem("session"))?.accessToken);

    useEffect(() => {
        async function fetchData() {
            const data = await groupApi.getJoinedGroups();
            const grpList = data.data.map(group =>
                <div key={group.groupName} className="col-md-6 col-lg-4 col-xl-3">
                    <a className="block block-rounded block-link-pop h-100 mb-0">
                        <div className="block-content block-content-full text-center bg-amethyst">
                            <div className="item item-2x item-circle bg-white-10 py-3 my-3 mx-auto">
                                <i className="fa fa-users fa-2x text-white-75"></i>
                            </div>
                            <div className="fs-sm text-white-75">
                                {group.numOfMems} Members
                            </div>
                        </div>
                        <div className="block-content block-content-full">
                            <h4 className="h5 mb-1">
                                {group.groupName}
                            </h4>
                            <div className="fs-sm text-end">
                                <div className="block-options d-flex" style={{paddingLeft: 0}}>
                                    <div className="col-sm-6 text-start">
                                        <p style={{marginBottom: 0}}
                                           className={`group-role ${group.role === 'Co-owner' ? 'text-warning' : 'text-success'} pt-1`}>{group.role}</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <button type="button" className="btn-block-option"
                                                data-bs-toggle="modal" data-bs-target="#grpdetail-modal"
                                                onClick={() => {
                                                    setGroupId(group.groupName);
                                                    setRole(group.role)
                                                }}>
                                            <i className="si si-info text-info fw-bold"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            );
            setGroups(grpList);
            setSelf(jwt(accessToken.current).email);
        }

        fetchData();
    }, [grpCreate, grpRefresh]);

    return (
        <>
            <PanelHero title={'Joined Groups'} photo={'gjoined'}/>
            <div className="content content-boxed">
                <div className="row items-push py-4">
                    {groups}
                </div>
            </div>
            <GroupDetail groupId={groupId} role={role} self={self} setGrpRefresh={setGrpRefresh} grpRefresh={grpRefresh}
                         connection={connection}/>
        </>
    );
}

export default GroupJoined;