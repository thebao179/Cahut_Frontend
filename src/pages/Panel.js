import React, {useEffect} from "react";
import Footer from "../components/General/Footer";
import Dashboard from "../components/Panel/Dashboard";
import GroupOwned from "../components/Panel/GroupOwned";
import GroupJoined from "../components/Panel/GroupJoined";
import Header from "../components/General/Header";
import Navbar from "../components/General/Navbar";
import GroupAdd from "../components/Modals/GroupAdd";
import Profile from "../components/Panel/Profile";

function Panel({ component }) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/assets/js/oneui.app.min.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div id="page-container" className="page-header-dark main-content-boxed">
            <Header />
            <main id="main-container">
                <Navbar component={component} />
                {component === 'dashboard' && <Dashboard />}
                {component === 'gjoined' && <GroupJoined />}
                {component === 'gowned' && <GroupOwned />}
                {component === 'profile' && <Profile />}
            </main>
            <GroupAdd />
            <Footer />
        </div>
    );
}

export default Panel;
