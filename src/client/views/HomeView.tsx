import * as React from "react";
import { UserService } from "../services/user";

interface IHomeState {
    feedLoading: boolean
}

export class HomeViewComponent extends React.Component<{}, IHomeState> {

    constructor(props: {}) {
        super(props);
        this.setFeedLoading = this.setFeedLoading.bind(this);
        this.state = {
            feedLoading: true
        }
    }

    componentWillMount() {
        if (!UserService.isLoggedIn()) {
            // Redirect user to home
        }
    }

    setFeedLoading(loading: boolean) {
        this.setState({ feedLoading: loading });
    }

    render() {
        return <div>Home</div>
    }
}
