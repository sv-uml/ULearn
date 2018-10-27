import * as React from "react";
import { UserService } from "../services/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDesktop, faQuestion, faChartBar } from "@fortawesome/free-solid-svg-icons";

library.add(faDesktop);
library.add(faQuestion);
library.add(faChartBar);

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
        return <section className="front-page">
            <div className="text-banner">
                <h1>Efficiently train your team</h1>
                <span className="banner-description">ULearn is a learning management system that helps you 
                    train your team through rich content-creation tools, 
                    powerful course assesments and advanced analytics.</span>
                <div className="signup-action-container">
                    <input type="text" placeholder="Email address" />
                    <button>Sign up</button>
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
