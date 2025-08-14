import { createBrowserRouter } from "react-router";
import App from "./App";
import Dashboard from "./pages/dashboard";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/SignIn";
import SignupPage from "./pages/auth/SignUp";
import AuthLayout from "./pages/auth/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          {
            path: "signin",
            Component: LoginPage,
          },
          {
            path: "signup",
            Component: SignupPage,
          },
        ],
      },
    ],
  },
]);
