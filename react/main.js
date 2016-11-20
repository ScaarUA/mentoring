import React from 'react';
import ReactDOM from 'react-dom';
import './main.scss';

class CommentBox extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4 form-login">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Login via site</h3>
                            </div>
                            <div className="panel-body">
                                <form acceptCharset="UTF-8" role="form">
                                    <fieldset>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="E-mail" name="email" type="text"/>
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control" placeholder="Password" name="password" type="password" value=""/>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input name="remember" type="checkbox" value="Remember Me"/> Remember Me
                                            </label>
                                        </div>
                                        <input className="btn btn-lg btn-success btn-block" type="submit" value="Login"/>
                                    </fieldset>
                                </form>
                                <hr/>
                                <center><h4>OR</h4></center>
                                <input className="btn btn-lg btn-facebook btn-block" type="submit" value="Login via google"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    );
    }
}

ReactDOM.render(
<CommentBox />,
    document.getElementById('root')
);