import fetch from 'isomorphic-fetch';

function login(body) {
    const config = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    };
    return fetch('/auth/local/login', config);
}

export { login };