import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { LoginForm } from './login-form/LoginForm';
import { AuthMessages } from '../auth-messages/AuthMessages';
import authService from '../../services/authService';

class LoginPage extends Component {
    static get propTypes() {
        return {
            isLoading: PropTypes.bool,
            validationError: PropTypes.bool,
            onLoginClick: PropTypes.func
        };
    }

    render() {
        const {isLoading, validationError, onLoginClick} = this.props;

        return <div>
            <h2>Login</h2>
            <AuthMessages isLoading={isLoading} validationError={validationError}/>
            <LoginForm onLoginClick={onLoginClick}/>
        </div>;
    }
}

function mapStateToProps(state) {
    return state.auth;
}

function mapDispatchToProps(dispatch) {
    return {
        onLoginClick: refs => dispatch(authService.login(refs))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);