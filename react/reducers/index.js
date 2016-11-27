import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userReducer from './user';
import commentsReducer from './comments';

export default combineReducers({
    comments: commentsReducer,
    user: userReducer,
    routing: routerReducer
})