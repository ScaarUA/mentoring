import React, { Component, PropTypes } from 'react';

export class RegisterForm extends Component {
    static get propTypes() {
        return {
            onRegisterClick: PropTypes.func
        };
    }

    render() {
        const { onRegisterClick } = this.props;

        return <div>
            <p>
                <input type="text"
                   name="name"
                   ref="name"
                   placeholder="Your Name"/>
            </p>
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
                <button onClick={() => onRegisterClick(this.refs)}>Register</button>
            </p>
        </div>;
    }
}

