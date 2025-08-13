import { createBrowserRouter } from "react-router";
import App from "./App";
import Dashboard from "./pages/dashboard";
import LandingPage from "./pages/LandingPage";


export const router=createBrowserRouter([
    {
        path:"/",
        Component:App,
        children:[
            {
                index:true,
                Component:LandingPage,
            },
            {
                path:"dashboard",
                Component:Dashboard,
            }
        ]
    }
])