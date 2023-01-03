import {createBrowserRouter} from "react-router-dom";
import Authentication from "../pages/Authentication";
import Panel from "../pages/Panel";
import Activation from "../pages/Activation";
import GroupJoin from "../pages/GroupJoin";
import PresentationDetail from "../pages/PresentationDetail";
import PresentationView from "../pages/PresentationView";
import SlideDetail from "../pages/SlideDetail";
import React from "react";
import NotFoundPage from "../pages/404";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Authentication component={'signin'}/>
    },
    {
        path: "/signup",
        element: <Authentication component={'signup'}/>
    },
    {
        path: "/password-reset",
        element: <Authentication component={'password-reset'}/>
    },
    {
        path: "/change-password/:code",
        element: <Authentication component={'change-password'}/>
    },
    {
        path: "/dashboard",
        element: <Panel component={'dashboard'}/>
    },
    {
        path: "/groups",
        children: [{
            path: "joined",
            element: <Panel component={'gjoined'}/>
        },
            {
                path: "owned",
                element: <Panel component={'gowned'}/>
            }]
    },
    {
        path: "/profile",
        element: <Panel component={'profile'}/>
    },
    {
        path: "/account/activate/:code",
        element: <Activation/>
    },
    {
        path: "/group/join/:code",
        element: <GroupJoin/>
    },
    {
        path: "/presentations",
        children: [{
            path: "collaborated",
            element: <Panel component={'pcollab'}/>
        },
            {
                path: "owned",
                element: <Panel component={'powned'}/>
            }]
    },
    {
        path: "/presentation/edit/:id",
        element: <PresentationDetail/>
    },
    {
        path: "/view/:id",
        element: <PresentationView/>
    },
    {
        path: "/presentation/present/:id",
        element: <SlideDetail/>
    },
    {
        path: "/presentation/result/:id",
        element: <Panel component={'presult'}/>
    },
    {
        path: "*",
        element: <NotFoundPage/>
    }
]);

export default router;