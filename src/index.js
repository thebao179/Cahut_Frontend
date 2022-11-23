import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import Authentication from "./pages/Authentication";
import Panel from "./pages/Panel";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GroupJoined from "./components/Panel/GroupJoined";
import GroupOwned from "./components/Panel/GroupOwned";
import Dashboard from "./components/Panel/Dashboard";
import GroupDetail from "./components/Modals/GroupDetail";
const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Authentication />
    },
    {
        path: "/dashboard",
        element: <Dashboard/>
    },
    {
        path: "/groups",
        //element: <GroupOwned/>,
        children: [{
            path: "joined",
            element: <GroupJoined/>
        },
        {
            path: "owned",
            element: <GroupOwned/>
        }
    ]
    }
    // {
    //     path: "/ownedgroups",
    //     element: <GroupOwned />,
    // },
    // {
    //     path: "/joinedgroups",
    //     element: <GroupJoined />,
    // },
    // {
    //     path: "/groups",
    //     element: <GroupDetail groupId={'1'}/>,
    // },
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
