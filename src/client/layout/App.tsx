import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { HeaderComponent } from "../components/global/Header";
import { router } from "../components/global/Route";
import "./layout.css";

export const Content = () => (
    <div className="container" id="app_context">
        {router.map((route, num) => (
            <Route key={num} path={route.path} exact={route.exact} component={route.main} />
        ))}
        <footer>ULearn &copy; 2018</footer>
    </div>
);

export const App = () => (
    <div className="root">
        <HeaderComponent />
        <Switch>
            <Content />
        </Switch>
    </div>
);