import "./backButton.css";
import * as React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleLeft);
library.add(faPlus);

interface ActionButtonProps {
    label: string,
    link: string,
    icon: string
}

export class ActionButton extends React.Component<ActionButtonProps, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return <Link to={this.props.link} className="backButton-container">
            <span className="backButton-visual"><FontAwesomeIcon icon={this.props.icon as IconProp} /></span>
            <span>{this.props.label}</span>
        </Link>
    }
}