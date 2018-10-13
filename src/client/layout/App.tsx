import * as React from "react";
import { Switch } from "react-router-dom";
import { Header } from "../components/global/Header";
import { AppContainer } from "../components/AppContainer";
import { UserService } from "../services/user";
import { AppRoute, router } from "../components/global/Route";

export const Content = () => (
    <div className="global-container" id="app_context">
        <div className="content">
            <div className="area">
                {router.map((route, num) => (
                    <AppRoute key={num} path={route.path} exact={route.exact} component={route.main} auth={route.auth} />
                ))}
            </div>
            <footer>ULearn &copy; 2018</footer>
        </div>
    </div>
);

export const App = () => (
    <div className="root">
        <Header />
        <Switch>
            <Content />
        </Switch>
    </div>
);