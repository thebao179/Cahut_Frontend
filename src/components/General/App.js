import useToken from "../../Hooks/useToken";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication from "../../pages/Authentication";
import Panel from "../../pages/Panel";
import Activation from "../../pages/Activation";


function App() {
    const queryClient = new QueryClient();
    const { token, setToken } = useToken();

    const authenRouter = createBrowserRouter([
        {
            path: "*",
            element: <Authentication component={'signin'} setToken={setToken} />
        },
        {
            path: "/signup",
            element: <Authentication component={'signup'} />
        },
    ])
    const router = createBrowserRouter([
        {
            path: "/dashboard",
            element: <Panel component={'dashboard'} />
        },
        {
            path: "/groups",
            children: [{
                path: "joined",
                element: <Panel component={'gjoined'} />
            },
            {
                path: "owned",
                element: <Panel component={'gowned'} />
            }]
        },
        {
            path: "/profile",
            element: <Panel component={'profile'} />
        },
        {
            path: "/account/activate/:code",
            element: <Activation />
        },

    ]);

    if (!token) {
        return (
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={authenRouter} />
            </QueryClientProvider>
        );
    };

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );

}

export default App;