import React, { Component } from 'react';
import { Link } from 'react-router';

export class AuthLinks extends Component {
    render() {
        return <div>
            <Link to="/login">Login</Link>
            &nbsp;
            <Link to="/register">Register</Link>
        </div>;
    }
}