import * as React from "react";
import { Link } from "react-router-dom";
import { UserService } from "../../services/user";

export interface registerState { 
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string 
};

export class RegisterComponent extends React.Component<{}, registerState> {

    constructor(props: {}) {
        super(props);
        this.state = { 
            firstName: "", 
            lastName: "", 
            email: "",
            password: ""
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
        return <div className="auth-form signup">
            <h2>Register</h2>
            <span>Please enter your name and email. Then, choose a password.</span>
            <form onSubmit={e => this.onSubmit(e)}>
                <div className="auth-signup-name">
                    <input type="text" ref="register-first-name" placeholder="First Name" onChange={e => this.setState({firstName: e.target.value})} />
                    <input type="text" ref="register-last-name" placeholder="Last Name" onChange={e => this.setState({lastName: e.target.value})} />
                </div>
                <input type="email" className="register-email" placeholder="Email" onChange={e => this.setState({email: e.target.value})} />
                <input type="password" className="register-pass" placeholder="Password" onChange={e => this.setState({password: e.target.value})} />
                <input type="submit" value="Register" />
            </form>
            <span className="auth-switch">Already have an account? <Link to="/login">Login</Link></span>
        </div>
    }
}
