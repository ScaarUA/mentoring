import {
    LOGIN
} from '../actions';

export default function comments(state = {}, action) {
    switch (action.type) {
    case LOGIN:
        return action.payload;
    default:
        return state;
    }
}
