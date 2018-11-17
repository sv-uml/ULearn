import * as React from "react";
import { Login } from "../../components/auth/Login";
import { LogoutComponent } from "../../components/auth/Logout";
import { RegisterComponent } from "../../components/auth/Register";
import { HomeViewComponent } from "../../views/HomeView";

interface routerProps {
    path: string,
    exact: boolean,
    main: any
}

export const router: routerProps[] = [{
    path: "/",
    exact: true,
    main: () => <HomeViewComponent />
},
{
    path: "/login",
    exact: false,
    main: () => <Login />
},
{
    path: "/register",
    exact: false,
    main: () => <RegisterComponent />
},
{
    path: "/user/logout",
    exact: true,
    main: () => <LogoutComponent />
}];
