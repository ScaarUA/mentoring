import React from 'react';

export default class BuilderDropdown extends React.Component {
    render() {
        const itemNodes = this.props.items.map((item) => {
            return (
                <li key={item.toString()}>
                    <a className={this.classesItem(item)}
                       onClick={() => this.props.onChange(item)}>{item}</a>
                </li>
            );
        });
        return (
            <div className="dropdown">
                <button className="btn btn-default dropdown-toggle"
                        type="button" id="dropdownMenu1" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="true">
                    {this.props.selected}
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    {itemNodes}
                </ul>
            </div>
        );
    }

    classesItem(item) {
        return this.props.selected === item ? 'item-active' : '';
    }
}
