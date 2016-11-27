export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const LOGIN = 'LOGIN';

export const addComment = (payload) => ({
    type: ADD_COMMENT,
    payload
});

export const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    payload: { id }
});

export const login = (payload) => ({
    type: LOGIN,
    payload
});