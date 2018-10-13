import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { UserService } from "../../services/user";

interface logoutProps extends RouteComponentProps<{}> {}

class LogoutComponent extends React.Component<logoutProps, {}> {

    constructor(props: logoutProps) {
        super(props);
    }

    componentWillMount() {
        UserService.logout();
        window.location.href = "/";
    }

    render () {
        return "";
    }
}

export const Logout = withRouter(LogoutComponent);