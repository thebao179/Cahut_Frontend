import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Authentication from "../../pages/Authentication";
import Panel from "../../pages/Panel";
import Activation from "../../pages/Activation";
import useToken from "../../hooks/useToken";
import GroupJoin from "../../pages/GroupJoin";
import PresentationDetail from "../../pages/PresentationDetail";
import PresentationView from "../../pages/PresentationView";
import SlideDetail from "../../pages/SlideDetail";

function App() {
    const queryClient = new QueryClient();
    const {token, setToken} = useToken();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Authentication component={'signin'} setToken={setToken} usrToken={token}/>
        },
        {
            path: "/signup",
            element: <Authentication component={'signup'} usrToken={token}/>
        },
        {
            path: "/dashboard",
            element: <Panel component={'dashboard'} setToken={setToken} usrToken={token}/>
        },
        {
            path: "/groups",
            children: [{
                path: "joined",
                element: <Panel component={'gjoined'} setToken={setToken} usrToken={token}/>
            },
                {
                    path: "owned",
                    element: <Panel component={'gowned'} setToken={setToken} usrToken={token}/>
                }]
        },
        {
            path: "/profile",
            element: <Panel component={'profile'} setToken={setToken} usrToken={token}/>
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
            element: <Panel component={'presentations'} setToken={setToken} usrToken={token}/>
        },
        {
            path: "/presentation/edit/:id",
            element: <PresentationDetail usrToken={token} setToken={setToken}/>
        },
        {
            path: "/view/:id",
            element: <PresentationView/>
        },
        {
            path: "/presentation/present/:id",
            element: <SlideDetail usrToken={token} setToken={setToken}/>
        },
    ]);

    return (

        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>

    );
}


export default App;