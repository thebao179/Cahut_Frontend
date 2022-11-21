import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./Components/Authentication/Authentication";
import DashBoard from "./Components/Dashboard/Dashboard";
import Gallery from "./Components/MemesGallery";
import GroupsView from "./Components/Groups/GroupsView/GroupsView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App authen="sigin" />
  },
  {
    path: "/signup",
    element: <App authen="signup" />
  },
  {
    path: "/dashboard",
    element: <DashBoard />
  },
  {
    path: "/groupmanage",
    element: <GroupsView />
  },
  {
    path: "/memesgallery",
    element: <Gallery />
  }
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
