import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userReducer from './user';
import commentsReducer from './comments';
import builderReducer from './builder';

export default combineReducers({
    comments: commentsReducer,
    user: userReducer,
    builder: builderReducer,
    routing: routerReducer
})