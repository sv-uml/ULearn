import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { UserService } from "../../services/user";

export class LogoutComponent extends React.Component {

    constructor(props: {}) {
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
