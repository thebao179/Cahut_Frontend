import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import Authentication from "./pages/Authentication";
import Panel from "./pages/Panel";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Activation from "./pages/Activation";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Authentication component={'signin'} />
    },
    {
        path: "/signup",
        element: <Authentication component={'signup'} />
    },
    {
        path: "/dashboard",
        element: <Panel component={'dashboard'} />
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
        element: <Panel component={'profile'} />
    },
    {
        path: "/account/activate/:code",
        element: <Activation />
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
