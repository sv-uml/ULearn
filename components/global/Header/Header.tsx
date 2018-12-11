import "./Header.css";
import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AuthState, GlobalState } from "../../../misc/Auth";
import { Dropdown, dropdownItem } from "../../../misc/Dropdown";

interface HeaderProps {
    authState?: AuthState
}

class HeaderComponent extends React.Component<HeaderProps, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const items: dropdownItem[] = [{
            label: "Logout",
            link: "/logout"
        }];

        return <nav className={"header " + (!this.props.authState.loggedIn && "guest")}>
            <div className="container">
                <div className="header-logo">
                    <Link to="/" className="navbar-brand header-item">ULearn</Link>
                </div>
                <div className="header-links">
                    {
                        this.props.authState.loggedIn &&
                        <Dropdown className="" items={items}>{this.props.authState.name}</Dropdown>
                    }
                    {
                        !this.props.authState.loggedIn &&
                        <>
                        <Link to="/login" className="header-item">Sign In</Link>
                        <Link to="/register" className="header-item">Sign Up</Link>
                        </>
                    }
                </div>
            </div>
        </nav>
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {
        authState: state.auth
    };
}

export const Header = connect(mapStateToProps)(HeaderComponent);
