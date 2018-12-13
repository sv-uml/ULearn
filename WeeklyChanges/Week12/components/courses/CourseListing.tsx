
import "./courses.css";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
        this.state = { courses: [] }
    }

    componentWillMount() {
        if (!this.props.authState.loggedIn) {
            this.props.history.push("/login?req=1");
        }
    }

    componentDidMount() {
        CourseService.getAll(this.props.authState.token).then(data => {
            let listing: JSX.Element[] = [];
            let obj: any = {}
            for (let i = 0; i < data.data.courses.length; i++) {
                obj = (data.data.courses as any[])[i];
                listing.push(<div className="listing-item">
                    <div className="listing-item-title">
                        <span>{obj.title}</span>
                    </div>
                    <div className="listing-item-desc">{obj.description}</div>
                </div>)
            }
            this.setState({ courses: listing });
        })
    }

    render() {
        return <section className="listing">
            <div className="container">
                <div className="listing-header">
                    <h2 className="title-label">Courses</h2>
                    <ActionButton label="Create course" link="/course/new" icon="plus" />
                </div>
                {this.state.courses}
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
