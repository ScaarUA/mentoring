import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './auth';
import accessibility from './accessibility';

export default combineReducers({
    auth,
    accessibility,
    routing: routerReducer
});