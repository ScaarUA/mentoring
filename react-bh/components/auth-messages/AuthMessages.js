import React, { Component, PropTypes } from 'react';

export class AuthMessages extends Component {
    static get propTypes() {
        return {
            isLoading: PropTypes.bool,
            validationError: PropTypes.bool
        };
    }

    render() {
        const { isLoading, validationError } = this.props;

        return <div>
            {isLoading ? <p>Loading...</p> : null}
            {validationError ? <p>You\'ve put wrong email or password'</p> : null}
        </div>;
    }
}

