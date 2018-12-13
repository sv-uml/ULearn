import * as React from "react";
import { Login } from "../components/auth/Login";
import { Logout } from "../components/auth/Logout";
import { Register } from "../components/auth/Register";
import { HomeView } from "../views/HomeView";
import { CourseListing } from "../components/courses/CourseListing";
import { NewCourse } from "../components/courses/NewCourse";

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
    path: "/logout",
    exact: false,
    main: () => <Logout />
},
{
    path: "/courses",
    exact: true,
    main: () => <CourseListing />
},
{
    path: "/course/new",
    exact: true,
    main: () => <NewCourse />
}];
