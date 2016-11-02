import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';

@Injectable()
export class UsersService {
    constructor(
        private http: Http
    ) {}

    public getUser(id): Observable<User[]> {
        return this.http.get(`/api/users/${id}`)
            .map( this.handleData )
            .catch( this.handleError );
    }

    private handleData(response: Response) {
        let body = response.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message)
            ? error.message
            : error.status
            ? `${error.status} - ${error.statusText}`
            : 'Server error';

        console.error(errMsg);

        return Observable.throw(errMsg);
    }
}
