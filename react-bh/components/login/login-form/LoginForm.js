import React, { Component, PropTypes } from 'react';

export class LoginForm extends Component {
    static get propTypes() {
        return {
            onLoginClick: PropTypes.func
        };
    }

    render() {
        const { onLoginClick } = this.props;

        return <div>
            <p>
                <input type="email"
                   name="email"
                   ref="email"
                   placeholder="email"/>
            </p>
            <p>
                <input type="password"
                   name="password"
                   ref="password"
                   placeholder="password"/>
            </p>
            <p>
                <button onClick={() => onLoginClick(this.refs)}>Login</button>
            </p>
        </div>;
    }
}

