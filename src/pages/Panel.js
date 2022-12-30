/* eslint-disable */
import React, {useEffect, useState} from "react";
import Footer from "../components/General/Footer";
import Dashboard from "../components/Panel/Dashboard";
import GroupOwned from "../components/Panel/GroupOwned";
import GroupJoined from "../components/Panel/GroupJoined";
import Header from "../components/General/Header";
import Navbar from "../components/General/Navbar";
import GroupAdd from "../components/Modals/GroupAdd";
import Profile from "../components/Panel/Profile";
import {useLocation, useNavigate} from "react-router-dom";
import jwt from "jwt-decode";
import PresentationAdd from "../components/Modals/PresentationAdd";
import PresentationOwned from "../components/Panel/PresentationOwned";
import PresentationCollab from "../components/Panel/PresentationCollab";
import PresentationResult from "../components/Panel/PresentationResult";
import {HubConnectionBuilder} from "@microsoft/signalr";

function Panel({component, usrToken, setToken}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [profileUpd, setProfileUpd] = useState(0);
    const [grpCreate, setGrpCreate] = useState(0);
    const [presentationsCreated, setPresentationsCreated] = useState(0);
    const [connection, setConnection] = useState();

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_REALTIME_HOST + "?presentationId=" + null, { accessTokenFactory: () => usrToken })
            .withAutomaticReconnect()
            .build();
        setConnection(connect);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on("NotifyGroup", (notifyInfo) => {
                        One.helpers('jq-notify', {
                            type: 'info',
                            icon: 'fa fa-info-circle me-1',
                            message: `Presentating in group: ${notifyInfo.grpName}`,
                            url: notifyInfo.link,
                        });
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection])

    useEffect(() => {
        if (!usrToken) {
            localStorage.setItem('prevurl', location.pathname);
            navigate('/');
        } else if (usrToken) {
            const payload = jwt(usrToken);
            const currentDate = new Date();
            if (payload.exp * 1000 < currentDate.getTime()) {
                localStorage.removeItem('token');
                setToken('');
            }
        }
        document.querySelectorAll('[data-toggle="class-toggle"]:not(.js-class-toggle-enabled), .js-class-toggle:not(.js-class-toggle-enabled)').forEach((e => {
            e.addEventListener("click", (() => {
                e.classList.add("js-class-toggle-enabled");
                let t = !!e.dataset.class && e.dataset.class.split(" ");
                document.querySelectorAll(e.dataset.target).forEach((e => {
                    t && t.forEach((t => {
                        e.classList.toggle(t)
                    }))
                }))
            }))
        }))
    }, [usrToken]);
    return (
        <div id="page-container" className="page-header-dark main-content-boxed">
            <Header setToken={setToken} token={usrToken} profileUpd={profileUpd}/>
            <main id="main-container">
                <Navbar component={component}/>
                {component === 'dashboard' &&
                    <Dashboard token={usrToken} grpCreate={grpCreate} presentationsCreate={presentationsCreated}/>}
                {component === 'gjoined' && <GroupJoined token={usrToken} grpCreate={grpCreate} connection={connection}/>}
                {component === 'gowned' && <GroupOwned token={usrToken} grpCreate={grpCreate} connection={connection}/>}
                {component === 'profile' &&
                    <Profile token={usrToken} profileUpd={profileUpd} setProfileUpd={setProfileUpd}/>}
                {component === 'powned' &&
                    <PresentationOwned token={usrToken} presentationsCreate={presentationsCreated}/>}
                {component === 'pcollab' && <PresentationCollab token={usrToken}/>}
                {component === 'presult' && <PresentationResult token={usrToken}/>}
            </main>
            <GroupAdd grpCreate={grpCreate} setGrpCreate={setGrpCreate}/>
            <PresentationAdd preCreate={presentationsCreated} setPreCreate={setPresentationsCreated}/>
            <Footer/>
        </div>
    );
}

export default Panel;
