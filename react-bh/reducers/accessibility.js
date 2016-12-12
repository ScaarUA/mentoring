import { ACTIONS } from '../constants';

export default function accessibility(state = {
    isLoggedIn: false
}, action) {
    switch (action.type) {
    case ACTIONS.ACCESS_DENIED:
        return Object.assign({}, state, {
            isLoggedIn: false
        });
    case ACTIONS.ACCESS_GRANTED:
        return Object.assign({}, state, {
            isLoggedIn: true
        });
    default:
        return state;
    }
}