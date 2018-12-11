
import "./courses.css";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { GlobalState, AuthState } from "../../misc/Auth";

interface courseListingProps {
    authState?: AuthState,
    history?: { push(path: string): any }
}

class CourseListingComponent extends React.Component<courseListingProps, {}> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.authState.loggedIn) {
            this.props.history.push("/login?req=1");
        }
    }

    render() {
        return <section className="container listing">
        <Link to="/course/new">Create new course</Link>
        </section>
    }
};

const mapStateToProps = (state: GlobalState) => {
    return {
        authState: state.auth
    };
}

export const CourseListing = connect(mapStateToProps)(withRouter(CourseListingComponent));
