import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Avatar} from './avatar/Avatar';

class AvatarGeneratorPage extends Component {
    render() {
        const {isLoggedIn} = this.props;

        return <div>
            <h4>{!isLoggedIn ?
                'Hello' : 'You\'re not logged in, please login'}</h4>
            <Avatar />
        </div>;
    }
}

function mapStateToProps(state) {
    return state.accessibility;
}

export default connect(mapStateToProps)(AvatarGeneratorPage);