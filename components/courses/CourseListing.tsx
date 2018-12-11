
import "./courses.css";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { GlobalState, AuthState } from "../../misc/Auth";
import { CourseService } from "../../services/CourseService";
import { ActionButton } from "../../misc/ActionButton";

interface courseListingProps {
    authState?: AuthState,
    history?: { push(path: string): any }
}

interface courseListingState {
    courses: any
}

class CourseListingComponent extends React.Component<courseListingProps, courseListingState> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.authState.loggedIn) {
            this.props.history.push("/login?req=1");
        }
    }

    componentDidMount() {
        CourseService.getAll(this.props.authState.token).then(data => {
            this.setState({ courses: data.data.courses });
        })
    }

    render() {
        return <section className="listing">
            <div className="container">
                <div className="listing-header">
                    <h2 className="title-label">Courses</h2>
                    <ActionButton label="Create course" link="/course/new" icon="plus" />
                </div>
            </div>
        </section>
    }
};

const mapStateToProps = (state: GlobalState) => {
    return {
        authState: state.auth
    };
}

export const CourseListing = connect(mapStateToProps)(withRouter(CourseListingComponent));
