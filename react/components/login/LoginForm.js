import React from 'react';
import { login } from '../../api/login';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = { email: '', password: '', fail: false, isLoading: false };
        this.state = this.defaultState;
    }

    changeInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    submit(e) {
        e.preventDefault();
        const data = {
            email: this.state.email.trim(),
            password: this.state.password.trim()
        };
        if (!data.email || !data.password) {
            return;
        }

        this.setState({ fail: false, isLoading: true});
        login(data)
            .then((response) => {
                if (response.status >= 400) {
                    this.setState({ fail: true, isLoading: false});
                } else {
                    browserHistory.push('/builder');
                }
                this.props.login(data);
            });
    }

    render() {
        const { login } = this.props;
        return (
            <div className="col-md-4 col-md-offset-4 form-login">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Sign in</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={(e) => this.submit(e)} autoComplete="off">
                            <div className="form-group">
                                <input className="form-control"
                                       placeholder="E-mail"
                                       name="email"
                                       autoComplete="off"
                                       onChange={(e) => this.changeInput(e)}
                                       value={this.state.email}
                                       type="text"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control"
                                       placeholder="Password"
                                       name="password"
                                       type="password"
                                       autoComplete="off"
                                       onChange={(e) => this.changeInput(e)}
                                       value={this.state.password}/>
                            </div>
                            { this.state.fail
                            && <span className="with-errors">Incorrect email or password</span> }
                            { this.state.isLoading && <div className="loader"></div> }
                            <button className="btn btn-lg btn-success btn-block"
                                    type="submit">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return { data: state.comments }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)