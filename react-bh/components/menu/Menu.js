import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { AuthLinks } from './auth-links/AuthLinks';
import { UserBar } from './user-bar/UserBar';

export class Menu extends Component {
    static get propTypes() {
        return {
            onLogout: PropTypes.func,
            isLoggedIn: PropTypes.bool
        };
    }

    render() {
        const {onLogout, isLoggedIn} = this.props;

        return <div>
            <Link to="/">Home</Link>
            {isLoggedIn ? <UserBar onLogout={onLogout}/> : <AuthLinks />
            }
        </div>;
    }
}