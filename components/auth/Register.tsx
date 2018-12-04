import * as React from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/user";

export interface registerState { 
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string,
    register_pending: boolean
};

export class RegisterComponent extends React.Component<{}, registerState> {

    constructor(props: {}) {
        super(props);
        this.state = { 
            firstName: "", 
            lastName: "", 
            email: "",
            password: "",
            register_pending: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        UserService.register(this.state.firstName, this.state.lastName, this.state.email, this.state.password).then((data) => {
            if (data.status !== 201) {
                alert("An error occurred while registering the user.");
                return;
            }
            // TODO: Log user in
        })
    }

    render() {
        return <div className="auth">
            <h2>Sign Up</h2>
            <form onSubmit={e => this.onSubmit(e)}>
                <div className="form-element">
                    <span>Name:</span>
                    <input type="text" ref="login-email" placeholder="e.g. John Smith" onChange={e => this.setState({email: e.target.value})} />
                </div>
                <div className="form-element">
                    <span>Email:</span>
                    <input type="text" ref="login-email" placeholder="Email (name@domain.com)" onChange={e => this.setState({email: e.target.value})} />
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
                    <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                </span>
            }
            <span className="auth-switch">Already have an account? <Link to="/login">Sign In</Link></span>
        </div>
    }
}
