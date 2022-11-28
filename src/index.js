import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import Authentication from "./pages/Authentication";
import Panel from "./pages/Panel";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Activation from "./pages/Activation";
import App from "./components/General/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);

