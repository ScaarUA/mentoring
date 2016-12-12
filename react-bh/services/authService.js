import $ from 'jquery';
import { browserHistory } from 'react-router';

import { requestLogin, successLogin, errorLogin,
    requestRegister, successRegister, errorRegister,
    denyAccess, grantAccess } from '../actions';
import storageService from './storageService';

class AuthService {
    login(refs) {
        let credentials = {
            email: refs.email.value.trim(),
            password: refs.password.value.trim()
        };

        return dispatch => {
            dispatch(requestLogin());

            $.ajax('/auth/local/login', {
                method: 'POST',
                data: credentials
            })
                .then(user => {
                    storageService.saveUser(user);
                    browserHistory.push('/');
                    dispatch(successLogin());
                    dispatch(grantAccess());
                })
                .catch(() => {
                    dispatch(errorLogin());
                });
        };
    }
    
    register(refs) {
        let credentials = {
            email: refs.email.value.trim(),
            password: refs.password.value.trim(),
            name: refs.name.value.trim()
        };

        return dispatch => {
            dispatch(requestRegister());

            $.ajax('/auth/local/signup', {
                method: 'POST',
                data: credentials
            })
                .then(user => {
                    storageService.saveUser(user);
                    browserHistory.push('/');
                    dispatch(successRegister());
                })
                .catch(() => {
                    dispatch(errorRegister());
                });
        };
    }

    logout() {
        return dispatch => {
            
            $.ajax('/auth/logout', {
                method: 'GET'
            })
                .then(() => {
                    dispatch(denyAccess());
                    storageService.removeUser();
                });
        };
    }
}

export default new AuthService();