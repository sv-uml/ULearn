import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dropdown, dropdownItem } from "../../misc/Dropdown";
import { AppState } from "../../reducers/AppReducer";
import { AuthState } from "../../misc/Auth";

interface headerProps {
    authState?: AuthState
}

const mapStateToProps = (state: AppState) => {
    return {
        authState: state.authState
    }
}

class HeaderComponent extends React.Component<headerProps, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        let userArea: JSX.Element;
        if (!this.props.authState.loggedIn) {
            userArea = <div><Link to="/login" className="option">Sign In</Link><Link to="/signup" className="option">Sign Up</Link></div>;
        } else {
            let items: dropdownItem[] = 
            [{
                label: "Profile", link: "/user/" + this.props.authState.user_id 
            }, {
                label: "Sign Out", link: "/user/logout"
            }];
            userArea = <Dropdown className="" items={items}>{this.props.authState.first_name} {this.props.authState.last_name}</Dropdown>;
        }

        return <nav className="header">
            <Link to="/" className="navbar-brand header-logo">ULearn</Link>
            <div className="options-container">
                <div className="links">
                    {userArea}
                </div>
            </div>
        </nav>
    }
}

export const Header = connect(mapStateToProps, null)(withRouter(HeaderComponent));
