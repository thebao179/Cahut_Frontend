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
import Presentations from "../components/Panel/Presentation";
import PresentationAdd from "../components/Modals/PresentationAdd";

function Panel({component, usrToken, setToken}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [profileUpd, setProfileUpd] = useState(0);
    const [grpCreate, setGrpCreate] = useState(0);
    const [presentationsCreated, setPresentationsCreated] = useState(0);
    const [isAdding, setIsAdding] = useState(true);
    if (usrToken) {
        const payload = jwt(usrToken);
        const currentDate = new Date();
        if (payload.exp * 1000 < currentDate.getTime()) {
            localStorage.removeItem('token');
            navigate('/');
        }
    }

    useEffect(() => {
        if (!usrToken) {
            navigate('/');
            localStorage.setItem('prevurl', location.pathname);
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
    if (isAdding) {
        return (
            <div id="page-container" className="page-header-dark main-content-boxed">
                <Header setToken={setToken} token={usrToken} profileUpd={profileUpd} />
                <main id="main-container">
                    <Navbar component={component}/>
                    {component === 'dashboard' && <Dashboard token={usrToken} grpCreate={grpCreate}/>}
                    {component === 'gjoined' && <GroupJoined token={usrToken} grpCreate={grpCreate}/>}
                    {component === 'gowned' && <GroupOwned token={usrToken} grpCreate={grpCreate}/>}
                    {component === 'profile' && <Profile token={usrToken} profileUpd={profileUpd} setProfileUpd={setProfileUpd}/>}
                    {component === 'presentations' && <Presentations token={usrToken} presentationsCreate={presentationsCreated}/> }
                </main>
                <GroupAdd grpCreate={grpCreate} setGrpCreate={setGrpCreate} setIsAdd={setIsAdding}/>
                <PresentationAdd preCreate={presentationsCreated} setPreCreate={setPresentationsCreated} setIsAdd={setIsAdding}/>
                <Footer/>
            </div>
        );
    }
    return (
        <div id="page-container" className="page-header-dark main-content-boxed">
            <Header setToken={setToken} token={usrToken} profileUpd={profileUpd} />
            <main id="main-container">
                <Navbar component={component}/>
                {component === 'dashboard' && <Dashboard token={usrToken} grpCreate={grpCreate}/>}
                {component === 'gjoined' && <GroupJoined token={usrToken} grpCreate={grpCreate}/>}
                {component === 'gowned' && <GroupOwned token={usrToken} grpCreate={grpCreate}/>}
                {component === 'profile' && <Profile token={usrToken} profileUpd={profileUpd} setProfileUpd={setProfileUpd}/>}
            </main>
            <Footer/>
        </div>
    );
}

export default Panel;
