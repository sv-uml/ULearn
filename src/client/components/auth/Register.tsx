import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { UserService } from "../../services/user";
import { AuthState } from "../../misc/Auth";
import { setUserState } from "../../actions/Auth";

interface registerProps extends RouteComponentProps<{}> {
    loginUser(data: AuthState): void
}

export interface registerState { 
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string 
};

class RegisterComponent extends React.Component<registerProps, registerState> {

    constructor(props: registerProps) {
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
            UserService.login(data.data.email, this.state.password).then((l_res) => {
                if (l_res.status == 201) {
                    UserService.saveToken(l_res.data.jwt);
                    this.props.loginUser({ 
                        loggedIn: true, 
                        user_id: data.data.user_id,
                        first_name: data.data.first_name,
                        last_name: data.data.last_name,
                        email: data.data.email
                    });
                }
            }).then(() => {
                this.props.history.push("/");
            });
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

const mapDispatchToProps = (dispatch: any) => {
    return {
        loginUser: (data: AuthState) => {
            dispatch(setUserState(data))
        }
    }
}

export const Register = connect(null, mapDispatchToProps)(withRouter(RegisterComponent))