import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Builder from '../components/builder/Builder'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { selectPhoto } = this.props;
        return (
            <div>
                <h2 className="title">Builder avatar</h2>
                <Builder onSelectFile={selectPhoto}/>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return { data: state.builder }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)