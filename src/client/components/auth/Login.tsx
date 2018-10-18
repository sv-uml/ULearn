import * as React from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/user";

interface loginState { email: string, password: string, login_pending: boolean };

export class LoginComponent extends React.Component<{}, loginState> {
    constructor(props: {}) {
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
                // TODO: Log user in
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
