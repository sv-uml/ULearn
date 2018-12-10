import * as React from "react";
import { Login } from "../components/auth/Login";
import { Logout } from "../components/auth/Logout";
import { Register } from "../components/auth/Register";
import { HomeView } from "../views/HomeView";

interface routerProps {
    path: string,
    exact: boolean,
    main: any
}

export const router: routerProps[] = [{
    path: "/",
    exact: true,
    main: () => <HomeView />
},
{
    path: "/login",
    exact: false,
    main: () => <Login />
},
{
    path: "/register",
    exact: false,
    main: () => <Register />
},
{
    path: "/user/logout",
    exact: true,
    main: () => <Logout />
}];
