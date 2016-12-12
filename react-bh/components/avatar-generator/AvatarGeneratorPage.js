import React, { Component } from 'react';
import { connect } from 'react-redux';

class AvatarGeneratorPage extends Component {
    render() {
        const {isLoggedIn} = this.props;

        return <div>
            <h4>{isLoggedIn ? 'Place for avatar generator' : 'You\'re not logged in, please login'}</h4>
        </div>;
    }
}

function mapStateToProps(state) {
    return state.accessibility;
}

export default connect(mapStateToProps)(AvatarGeneratorPage);