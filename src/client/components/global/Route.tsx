import * as React from "react";
import { withRouter, Route, RouteProps, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../../reducers/AppReducer";
import { AuthState } from "../../misc/Auth";
import { Login } from "../../components/auth/Login";
import { Logout } from "../../components/auth/Logout";
import { Register } from "../../components/auth/Register";
import { HomeView } from "../../views/HomeView";

interface routerProps {
    path: string,
    exact: boolean,
    auth: number,
    main: any
}

export const router: routerProps[] = [{
    path: "/",
    exact: true,
    auth: 0,
    main: () => <HomeView />
},
{
    path: "/login",
    exact: false,
    auth: 2,
    main: () => <Login />
},
{
    path: "/signup",
    exact: false,
    auth: 2,
    main: () => <Register />
},
{
    path: "/user/logout",
    exact: true,
    auth: 1,
    main: () => <Logout />
}];

interface IRouteProps extends RouteProps { 
    key: number, 
    auth: number,
    loggedIn?: boolean
}

class RouteComponent extends React.Component<IRouteProps, {}> {

    render() {
        let el: JSX.Element = <Route key={this.props.key} path={this.props.path} 
            exact={this.props.exact} component={this.props.component} />

        if (this.props.auth === 0 || 
            (this.props.auth === 1 && this.props.loggedIn) || 
            (this.props.auth === 2 && !this.props.loggedIn)) {
            return el;
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        authState: state.authState
    }
}

export const AppRoute = RouteComponent;
