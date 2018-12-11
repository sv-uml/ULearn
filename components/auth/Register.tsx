import "./login.css";
import * as React from "react";
import { connect } from "react-redux";
import { Link, withRouter, RouteProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDesktop, faQuestion, faChartBar, faSync } from "@fortawesome/free-solid-svg-icons";
import { parse } from "querystring";
import { UserService } from "../../services/user";
import { AuthState } from "../../misc/Auth";
import { setState } from "../../misc/AppActions";

library.add(faDesktop);
library.add(faQuestion);
library.add(faChartBar);
library.add(faSync);

interface registerProps { login(args: AuthState): void, history?: { push(path: string): any } };

export interface registerState { 
    name: string,
    email: string, 
    password: string,
    register_pending: boolean
};

class RegisterComponent extends React.Component<registerProps & RouteProps, registerState> {

    constructor(props: any) {
        super(props);
        this.state = { 
            name: "",
            email: "",
            password: "",
            register_pending: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const email = parse(this.props.location.search.substring(1)).email as string;
        if (email != null && email.length > 0) {
            this.setState({ email: email });
        }
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        UserService.register(this.state.name, this.state.email, this.state.password).then((data) => {
            if (data.status !== 200) {
                alert("An error occurred while authenticating the user.");
                return;
            }
            this.props.login({
                loggedIn: true,
                name: data.data.name,
                email: data.data.email,
                token: data.data.token
            });
            this.setState({ register_pending: false });
            this.props.history.push("/");
        })
    }

    render() {
        return <section className="container auth">
            <div className="login-form">
                <Link to="/" className="login-header-item">ULearn</Link>
                <div className="login-form-container">
                    <h2>Sign Up</h2>
                    <span>Please enter your name, email and password to register.</span>
                    <form onSubmit={e => this.onSubmit(e)}>
                        <div className="form-element">
                            <span>Name:</span>
                            <input type="text" ref="login-email" placeholder="Full Name (e.g. John Smith)" onChange={e => this.setState({name: e.target.value})} />
                        </div>
                        <div className="form-element">
                            <span>Email:</span>
                            <input type="text" ref="login-email" placeholder="Email (e.g. name@domain.com)" value={this.state.email} onChange={e => this.setState({email: e.target.value})} />
                        </div>
                        <div className="form-element">
                            <span>Password:</span>
                            <input type="password" className="login-pass" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
                        </div>
                        <input type="submit" value="Sign Up" disabled={this.state.register_pending} />
                    </form>
                    {
                        this.state.register_pending &&
                        <span className="auth-status-pending">
                            <FontAwesomeIcon icon="sync" spin={true} size="1x" />
                        </span>
                    }
                    <span className="auth-switch">Already have an account? <Link to="/login">Sign In</Link></span>
                </div>
            </div>
            <div className="login-banner">
                <div className="login-banner-infographic">
                    <h2>Workforce training made easy.</h2>
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
                </div>
            </div>
        </section>
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (args: AuthState) => {
            dispatch(setState(args))
        }
    }
};

export const Register = connect(null, mapDispatchToProps)(withRouter(RegisterComponent));
