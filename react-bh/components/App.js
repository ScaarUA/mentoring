import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Menu } from './menu/Menu';
import authService from '../services/authService';

class App extends Component {
    static get propTypes() {
        return {
            onLogout: PropTypes.func,
            isLoggedIn: PropTypes.bool
        };
    }
    
    render() {
        const {onLogout, isLoggedIn} = this.props;

        return <div>
            <p>Welcome to the great react app</p>
            <Menu onLogout={onLogout}
                  isLoggedIn={isLoggedIn}/>
            {this.props.children}
        </div>;
    }
}

function mapStateToProps(state) {
    return state.accessibility;
}

function mapDispatchToProps(dispatch) {
    return {
        onLogout: () => dispatch(authService.logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);