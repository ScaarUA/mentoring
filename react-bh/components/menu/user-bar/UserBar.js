import React, { Component } from 'react';

import storageService from '../../../services/storageService';

export class UserBar extends Component {

    render() {
        const {onLogout} = this.props;

        const user = storageService.getUser() || {};

        return <div>
            <h3>Hello {user.name}</h3>
            &nbsp;
            <b onClick={onLogout}
               style={{cursor: 'pointer'}}>Logout</b>
        </div>;
    }
}