import "./courses.css";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { GlobalState, AuthState } from "../../misc/Auth";

interface newCourseProps {
    authState?: AuthState,
    history?: { push(path: string): any }
}

class NewCourseComponent extends React.Component<newCourseProps, {}> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.authState.loggedIn) {
            this.props.history.push("/login?req=1");
        }
    }

    render() {
        return <section className="container course-new">
        new
        </section>
    }
};

const mapStateToProps = (state: GlobalState) => {
    return {
        authState: state.auth
    };
}

export const NewCourse = connect(mapStateToProps)(withRouter(NewCourseComponent));
