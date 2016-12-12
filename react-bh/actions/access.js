import { ACTIONS } from '../constants';

export function denyAccess() {
    return {
        type: ACTIONS.ACCESS_DENIED
    };
}

export function grantAccess() {
    return {
        type: ACTIONS.ACCESS_GRANTED
    };
}