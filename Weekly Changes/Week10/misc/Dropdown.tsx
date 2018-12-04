import * as React from "react";
import { Link } from "react-router-dom";

export interface dropdownItem {
    label: string,
    link: string,
    extra?: {
        order: string
    }
}

interface dropdownProps {
    className: string,
    items: dropdownItem[]
}

interface dropdownState {
    dropdownOpen: boolean
}

export class Dropdown extends React.Component<dropdownProps, dropdownState> {

    constructor(props: any) {
        super(props);
        this.state = { dropdownOpen: false }
        this.renderDropdown = this.renderDropdown.bind(this);
        this.renderItems = this.renderItems.bind(this);
    }

    renderDropdown() {
        if (!this.state.dropdownOpen) {
            this.setState({ dropdownOpen: !this.state.dropdownOpen });
            document.addEventListener("click", this.renderDropdown);
        } else {
            this.setState({ dropdownOpen: !this.state.dropdownOpen });
            document.removeEventListener("click", this.renderDropdown);
        }
    }

    renderItems(): JSX.Element[] {
        let dropdownItems: JSX.Element[] = [];
        for (let i: number = 0; i < this.props.items.length; i++) {
            dropdownItems.push(
            <div className="dropdown-item">
                <Link to={this.props.items[i].link} onClick={() => {
                }}>{this.props.items[i].label}</Link>
            </div>);
        }
        return dropdownItems;
    }

    render() {
        return <div className={"dropdown-container " + this.props.className}>
            <div className="dropdown-label" onClick={this.renderDropdown}>
                <span className="dropdown-label-text option">{this.props.children}</span>
            </div>
            <div className={"dropdown-content " + (this.state.dropdownOpen ? "open" : "") }>
                {this.renderItems()}
            </div>
        </div>
    }
}