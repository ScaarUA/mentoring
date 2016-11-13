import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { User } from '../../models/user';

import { LocalStorageService } from '../../shared/storage/local-storage.service';

const userStorageKey = 'USER';

@Injectable()
export class UsersService {
    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) {}

    public getUser(id): Promise<User[]> {
        return this.http.get(`/api/users/${id}`)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    public getCurrentUser() {
        return this.http.get('/api/users/current')
            .toPromise()
            .then(this.handleData)
            .then(this.storeData.bind(this))
            .catch(this.handleError);
    }

    public login(credentials) {
        return this.http.post('/auth/local/login', credentials)
            .toPromise()
            .then(this.handleData)
            .then(this.storeData.bind(this))
            .catch(this.handleError);
    }

    public register(credentials) {
        return this.http.post('/auth/local/signup', credentials)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    public logout() {
        return this.http.get('/auth/logout')
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
}
