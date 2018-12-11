import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDesktop, faQuestion, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { AuthState, GlobalState } from "../misc/Auth";

library.add(faDesktop);
library.add(faQuestion);
library.add(faChartBar);

interface HomeViewProps {
    authState?: AuthState,
    history?: { push(path: string): any }
}

interface IHomeState {
    email: string,
    feedLoading: boolean
}

class HomeViewComponent extends React.Component<HomeViewProps, IHomeState> {

    constructor(props: any) {
        super(props);
        this.setFeedLoading = this.setFeedLoading.bind(this);
        this.introRegister = this.introRegister.bind(this);
        this.state = {
            email: "",
            feedLoading: true
        }
    }

    componentWillMount() {
        if (this.props.authState.loggedIn) {
            // Redirect user to home
        }
    }

    setFeedLoading(loading: boolean) {
        this.setState({ feedLoading: loading });
    }

    introRegister() {
        this.props.history.push("/register?email=" + this.state.email);
    }

    render() {
        return <section className="container front-page">
            <div className="text-banner">
                <h1>Efficiently train your team</h1>
                <span className="banner-description">ULearn is a learning management system that helps you 
                    train your team through rich content-creation tools, 
                    powerful course assesments and advanced analytics.</span>
                <div className="signup-action-container">
                    <input type="text" placeholder="Email address" onChange={e => this.setState({email: e.target.value})} />
                    <button onClick={() => this.introRegister()}>Sign up</button>
                </div>
            </div>
            <div className="diagram">
                <div className="diagram-item">
                    <span className="diagram-icon"><FontAwesomeIcon icon="desktop" /></span>
                    <span className="diagram-text">Create courses to train your team</span>
                </div>
                <div className="diagram-item">
                    <span className="diagram-icon"><FontAwesomeIcon icon="question" /></span>
                    <span className="diagram-text">Assess each participant's understanding</span>
                </div>
                <div className="diagram-item">
                    <span className="diagram-icon"><FontAwesomeIcon icon="chart-bar" /></span>
                    <span className="diagram-text">Analyze effectiveness of the course</span>
                </div>
            </div>
        </section>
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        authState: state.auth
    };
}

export const HomeView = connect(mapStateToProps)(withRouter(HomeViewComponent));
