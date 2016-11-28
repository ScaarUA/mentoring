import {
    ADD_COMMENT,
    DELETE_COMMENT
} from '../actions';

const data = [
    { id: '2016-07-24T17:41:56.433Z', author: 'Pete Hunt', text: 'This is one comment' },
    { id: '2016-07-24T17:42:07.076Z', author: 'Jordan Walke', text: 'This is another comment' }
];

export default function comments(state = data, action) {
    switch (action.type) {
    case ADD_COMMENT:
        return [
            ...state,
            Object.assign(
                { id: new Date().toJSON() },
                action.payload
            )
        ];
    case DELETE_COMMENT:
        return state.filter((item) => item.id !== action.payload.id);
    default:
        return state;
    }
}
