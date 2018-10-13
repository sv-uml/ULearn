import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { UserService } from "../../services/user";
import { AuthState } from "../../misc/Auth";
import { setUserState } from "../../actions/Auth";

interface loginProps extends RouteComponentProps<{}> {
    loginUser(data: AuthState): void
}

interface loginState { email: string, password: string, login_pending: boolean };

class LoginComponent extends React.Component<loginProps, loginState> {
    constructor(props: loginProps) {
        super(props);
        this.state = { email: "", password: "", login_pending: false };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({ login_pending: true });

        UserService.login(this.state.email, this.state.password).then((data) => {
            if (data.status !== 201) {
                alert("An error occurred while authenticating the user.");
                return;
            }
            UserService.saveToken(data.data.jwt);
            UserService.getUser(UserService.getUserId()).then(res => {
                this.props.loginUser({ 
                    loggedIn: true, 
                    user_id: UserService.getUserId(),
                    first_name: res.firstName,
                    last_name: res.lastName,
                    email: res.email
                });
                this.props.history.push("/");
            });
        });
    }

    render() {
        return <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={e => this.onSubmit(e)}>
                <label> Email: 
                    <input type="text" ref="login-email" placeholder="Email (name@domaincom)" onChange={e => this.setState({email: e.target.value})} />
                </label>
                <label> Password:
                    <input type="password" className="login-pass" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
                </label>
                <input type="submit" value="Submit" disabled={this.state.login_pending} />
            </form>
            {
                this.state.login_pending &&
                <span className="auth-status-pending">
                    <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                </span>
            }
            <span className="auth-switch">Don't have an account? <Link to="/signup">Register</Link></span>
        </div>
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        loginUser: (data: AuthState) => {
            dispatch(setUserState(data))
        }
    }
}

export const Login = connect(null, mapDispatchToProps)(withRouter(LoginComponent))