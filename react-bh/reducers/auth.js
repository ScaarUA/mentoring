import { ACTIONS } from '../constants';

export default function auth(state = {
    validationError: false,
    isLoading: false
}, action) {
    switch (action.type) {
    case ACTIONS.LOGIN_REQUEST:
    case ACTIONS.REGISTER_REQUEST:
        return Object.assign({}, state, {
            validationError: false,
            isLoading: true
        });
    case ACTIONS.LOGIN_ERROR:
    case ACTIONS.REGISTER_ERROR:
        return Object.assign({}, state, {
            validationError: true,
            isLoading: false
        });
    case ACTIONS.LOGIN_SUCCESS:
    case ACTIONS.REGISTER_SUCCESS:
        return Object.assign({}, state, {
            validationError: false,
            isLoading: false
        });
    default:
        return Object.assign({}, state);
    }
}