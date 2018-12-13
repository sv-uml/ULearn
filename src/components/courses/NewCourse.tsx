import "react-datepicker/dist/react-datepicker.css";
import "./courses.css";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { GlobalState, AuthState } from "../../misc/Auth";
import { ActionButton } from "../../misc/ActionButton";
import { CourseService } from "../../services/CourseService";
library.add(faLightbulb);
library.add(faSync);

interface newCourseProps {
    authState?: AuthState,
    history?: { push(path: string): any }
}

interface newCourseState {
    title: string,
    description: string,
    post_pending: boolean,
    startDate: Date,
    endDate: Date
}

class NewCourseComponent extends React.Component<newCourseProps, newCourseState> {
    constructor(props: any) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.startDateSelected = this.startDateSelected.bind(this);
        this.state = { title: "", description: "", post_pending: false, startDate: new Date(), endDate: new Date() }
    }

    componentWillMount() {
        if (!this.props.authState.loggedIn) {
            this.props.history.push("/login?req=1");
        }
    }

    startDateSelected(date: Date) {
        this.setState({ startDate: date });
    }

    endDateSelected(date: Date) {
        this.setState({ endDate: date });
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        CourseService.create(this.state.title, this.state.description, Math.floor(this.state.startDate.getTime() / 1000), 
        Math.floor(this.state.endDate.getTime() / 1000), this.props.authState.token).then(() => {
            this.props.history.push("/courses");
        });
    }

    render() {
        return <section className="course-new">
            <div className="container">
                <ActionButton label="Back to Courses" link="/courses" icon="angle-left" />
                <h2 className="title-label">New course</h2>
                <form onSubmit={e => this.onSubmit(e)}>
                    <h2 className="section-label">About</h2>
                    <div className="form-element">
                        <span>Title:</span>
                        <input type="text" placeholder="Title of course (e.g. Compliance Basics)" onChange={e => this.setState({title: e.target.value})} autoFocus />
                        <span className="course-input-hint"><FontAwesomeIcon icon={faLightbulb} /><span>Keep it short and concise.</span></span>
                    </div>
                    <div className="form-element">
                        <span>Description:</span>
                        <textarea placeholder="Description" onChange={e => this.setState({description: e.target.value})} />
                        <span className="course-input-hint"><FontAwesomeIcon icon={faLightbulb} /><span>What will a user learn in this course?</span></span>
                    </div>
                    <h2 className="section-label">Schedule</h2>
                    <div className="form-element">
                        <span>Start:</span>
                        <DatePicker selected={this.state.startDate} 
                            onChange={this.startDateSelected}
                            showTimeSelect 
                            timeFormat="HH:mm" 
                            timeIntervals={1} 
                            dateFormat="MMMM d, yyyy h:mm aa" 
                            timeCaption="Time" />
                        <span className="course-input-hint"><FontAwesomeIcon icon={faLightbulb} /><span>When can users start registering for this course?</span></span>
                    </div>
                    <div className="form-element">
                        <span>End:</span>
                        <DatePicker selected={this.state.endDate} 
                            onChange={this.endDateSelected}
                            showTimeSelect 
                            timeFormat="HH:mm" 
                            timeIntervals={1} 
                            dateFormat="MMMM d, yyyy h:mm aa" 
                            timeCaption="Time" />
                        <span className="course-input-hint"><FontAwesomeIcon icon={faLightbulb} /><span>When does this course close?</span></span>
                    </div>
                    <input type="submit" value="Create" disabled={this.state.post_pending} />
                </form>
                {
                    this.state.post_pending &&
                    <span className="process-status-pending">
                        <FontAwesomeIcon icon="sync" spin={true} size="1x" />
                    </span>
                }
            </div>
        </section>
    }
};

const mapStateToProps = (state: GlobalState) => {
    return {
        authState: state.auth
    };
}

export const NewCourse = connect(mapStateToProps)(withRouter(NewCourseComponent));
