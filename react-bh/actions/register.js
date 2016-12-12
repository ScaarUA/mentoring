import { ACTIONS } from '../constants';

export function requestRegister() {
    return {
        type: ACTIONS.REGISTER_REQUEST
    };
}

export function successRegister() {
    return {
        type: ACTIONS.REGISTER_SUCCESS
    };
}

export function errorRegister() {
    return {
        type: ACTIONS.REGISTER_ERROR
    };
}