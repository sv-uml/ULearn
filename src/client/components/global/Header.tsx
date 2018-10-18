import * as React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export class HeaderComponent extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <nav className="header">
            <div className="container">
                <div className="header-logo">
                    <Link to="/" className="navbar-brand header-item">ULearn</Link>
                </div>
                <div className="header-links">
                    <Link to="/login" className="header-item">Sign In</Link>
                    <Link to="/signup" className="header-item">Sign Up</Link>
                </div>
            </div>
        </nav>
    }
}
