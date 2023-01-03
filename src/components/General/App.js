import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import {RouterProvider} from "react-router-dom";
import router from "../../router/history";

function App() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}>
            </RouterProvider>
        </QueryClientProvider>
    );
}

export default App;