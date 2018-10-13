import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../reducers/AppReducer";
import { UserService } from "../services/user";
import { AuthState } from "../misc/Auth";

interface IHomeProps extends RouteComponentProps<{}> {
    authState: AuthState,
}

interface IHomeState {
    feedLoading: boolean
}

const mapDispatchToProps = (dispatch: any) => {
    return {}
}

const mapStateToProps = (state: AppState) => {
    return {
        authState: state.authState
    }
}

class HomeViewComponent extends React.Component<IHomeProps, IHomeState> {

    constructor(props: IHomeProps) {
        super(props);
        this.setFeedLoading = this.setFeedLoading.bind(this);
        this.state = {
            feedLoading: true
        }
    }

    componentWillMount() {
        if (!UserService.isLoggedIn()) {
            this.props.history.push("/login");
        }
    }

    setFeedLoading(loading: boolean) {
        this.setState({ feedLoading: loading });
    }

    render() {
        return <div>Home</div>
    }
}

export const HomeView = connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeViewComponent));