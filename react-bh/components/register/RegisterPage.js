import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { RegisterForm } from './register-form/RegisterForm';
import { AuthMessages } from '../auth-messages/AuthMessages';
import authService from '../../services/authService';

class RegisterPage extends Component {
    static get propTypes() {
        return {
            isLoading: PropTypes.bool,
            validationError: PropTypes.bool,
            onRegisterClick: PropTypes.func
        };
    }

    render() {
        const {isLoading, validationError, onRegisterClick} = this.props;

        return <div>
            <h2>Register</h2>
            <AuthMessages isLoading={isLoading} validationError={validationError}/>
            <RegisterForm onRegisterClick={onRegisterClick}/>
        </div>;
    }
}

function mapStateToProps(state) {
    const {auth} = state;
    const {isLoading, validationError} = auth;

    return {
        isLoading,
        validationError
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onRegisterClick: refs => dispatch(authService.register(refs))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);