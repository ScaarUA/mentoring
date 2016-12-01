import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { User } from '../../models/user';

import { Whttp } from '../../shared/services/whttp.service';
import { LocalStorageService } from '../../shared/storage/local-storage.service';

const userStorageKey = 'USER';

@Injectable()
export class UsersService {
    public redirectUrl: String;

    constructor(private whttp: Whttp,
                private localStorageService: LocalStorageService) {
    }

    public getUser(id): Promise<User[]> {
        return this.whttp.get(`/api/users/${id}`)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    public getCurrentUser() {
        return this.whttp.get('/api/users/current')
            .toPromise()
            .then(this.handleData, this.handleUserNoLongerAvailable.bind(this))
            .then(this.storeData.bind(this))
            .catch(this.handleError);
    }

    public login(credentials) {
        return this.whttp.post('/auth/local/login', credentials)
            .toPromise()
            .then(this.handleData)
            .then(this.storeData.bind(this))
            .catch(this.handleError);
    }

    public register(credentials) {
        return this.whttp.post('/auth/local/signup', credentials)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    public logout() {
        return this.whttp.get('/auth/logout')
            .toPromise()
            .then(this.removeData)
            .catch(this.handleError);
    }

    public isInStorage() {
        return !!this.localStorageService.get(userStorageKey);
    }

    private handleData(response: Response) {
        return response.json();
    }

    private handleError(error: any) {
        let errMsg = (error.message)
            ? error.message
            : error.status
            ? `${error.status} - ${error.statusText}`
            : 'Server error';

        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    private storeData(userInfo) {
        if (!this.isInStorage()) {
            this.localStorageService.set(userStorageKey, userInfo);
        }

        return userInfo;
    }

    private removeData() {
        this.localStorageService.remove(userStorageKey);
    }

    private handleUserNoLongerAvailable(error) {
        if (error.status === 401) {
            this.removeData();
        }

        return Promise.reject(error);
    }
}
