import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/App';
import AvatarGeneratorPage from './components/avatar-generator/AvatarGeneratorPage';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import { NoPageFound } from './components/no-page-found/NoPageFound';
import { configureStore } from './store/store';

const store = configureStore();

const appElement = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={AvatarGeneratorPage} />
                <Route path="/" component={AvatarGeneratorPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </Route>
            <Route path="*" component={NoPageFound} />
        </Router>
    </Provider>
);

render(
    appElement,
    document.getElementById('app')
);
