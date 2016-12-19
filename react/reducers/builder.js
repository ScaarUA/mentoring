import {
    SELECT_PHOTO
} from '../actions';

export default function comments(state = {}, action) {
    switch (action.type) {
        case SELECT_PHOTO:
            return Object.assign({},
                { photo: action.payload }
            );
        default:
            return state;
    }
}
