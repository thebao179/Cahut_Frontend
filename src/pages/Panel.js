/* eslint-disable */
import React, {useEffect, useRef, useState} from "react";
import Footer from "../components/General/Footer";
import Dashboard from "../components/Panel/Dashboard";
import GroupOwned from "../components/Panel/GroupOwned";
import GroupJoined from "../components/Panel/GroupJoined";
import Header from "../components/General/Header";
import Navbar from "../components/General/Navbar";
import GroupAdd from "../components/Modals/GroupAdd";
import Profile from "../components/Panel/Profile";
import {useLocation, useNavigate} from "react-router-dom";
import PresentationAdd from "../components/Modals/PresentationAdd";
import PresentationOwned from "../components/Panel/PresentationOwned";
import PresentationCollab from "../components/Panel/PresentationCollab";
import PresentationResult from "../components/Panel/PresentationResult";
import {HubConnectionBuilder} from "@microsoft/signalr";

function Panel({component}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [profileUpd, setProfileUpd] = useState(0);
    const [grpCreate, setGrpCreate] = useState(0);
    const [presentationsCreated, setPresentationsCreated] = useState(0);
    const [connection, setConnection] = useState();
    const accessToken = useRef(JSON.parse(localStorage.getItem("session"))?.accessToken);

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_REALTIME_HOST + "?presentationId=" + null, {accessTokenFactory: () => accessToken.current})
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
                            message: `Click here! Go to view presentation in group: ${notifyInfo.grpName}`,
                            url: `${notifyInfo.link}`,
                        });
                    });
                })
                .catch((error) => console.log(error));
            return () => {
                connection.stop().then(() => {
                    console.log("Closed connection");
                });
            };
        }
    }, [connection])

    useEffect(() => {
        if (!accessToken.current) {
            localStorage.setItem('prevurl', location.pathname);
            navigate('/');
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
    }, []);
    return (
        <div id="page-container" className="page-header-dark main-content-boxed">
            <Header profileUpd={profileUpd}/>
            <main id="main-container">
                <Navbar component={component}/>
                {component === 'dashboard' &&
                    <Dashboard grpCreate={grpCreate} presentationsCreate={presentationsCreated}/>}
                {component === 'gjoined' && <GroupJoined grpCreate={grpCreate} connection={connection}/>}
                {component === 'gowned' && <GroupOwned grpCreate={grpCreate} connection={connection}/>}
                {component === 'profile' &&
                    <Profile profileUpd={profileUpd} setProfileUpd={setProfileUpd}/>}
                {component === 'powned' &&
                    <PresentationOwned presentationsCreate={presentationsCreated}/>}
                {component === 'pcollab' && <PresentationCollab/>}
                {component === 'presult' && <PresentationResult/>}
            </main>
            <GroupAdd grpCreate={grpCreate} setGrpCreate={setGrpCreate}/>
            <PresentationAdd preCreate={presentationsCreated} setPreCreate={setPresentationsCreated}/>
            <Footer/>
        </div>
    );
}

export default Panel;
