import * as React from "react";
import { Link } from "react-router-dom";
import { Dropdown, dropdownItem } from "../../misc/Dropdown";

export class HeaderComponent extends React.Component {

    constructor(props: any) {
        super(props);
    }

    render() {
        return <nav className="header">
            <Link to="/" className="navbar-brand header-logo">ULearn</Link>
            <div className="options-container">
                <div className="links">
                    <Link to="/login" className="option">Sign In</Link><Link to="/signup" className="option">Sign Up</Link>
                </div>
            </div>
        </nav>
    }
}
