import './main.scss';
import 'jquery';
import 'bootstrap/dist/js/bootstrap';
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './store/configureStore'

import App from './containers/App'
import CommentBox from './components/comments/CommentBox';
import LoginForm from './components/login/LoginForm';
import BuilderBox from './containers/BuilderBox';

const history = syncHistoryWithStore(browserHistory, configureStore());

render(
    <Provider store={configureStore()}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={LoginForm}/>
                <Route path="/comments" component={CommentBox}/>
                <Route path="/builder" component={BuilderBox}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
