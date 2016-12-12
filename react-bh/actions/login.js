import { ACTIONS } from '../constants';

export function requestLogin() {
    return {
        type: ACTIONS.LOGIN_REQUEST
    };
}

export function successLogin() {
    return {
        type: ACTIONS.LOGIN_SUCCESS
    };
}

export function errorLogin() {
    return {
        type: ACTIONS.LOGIN_ERROR
    };
}