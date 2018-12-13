import "./layout.css";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Header } from "../components/global/Header/Header";
import { router } from "../misc/Route";

export const Content = () => (
    <>
        {router.map((route, num) => (
            <Route key={num} path={route.path} exact={route.exact} component={route.main} />
        ))}
        <footer>ULearn &copy; 2018</footer>
    </>
);

export const App = () => (
    <div className="root">
        <Header />
        <Switch>
            <Content />
        </Switch>
    </div>
);
