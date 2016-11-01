import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Project } from './../../models/project';

@Injectable()
export class ProjectsService {
    constructor(
        private http: Http
    ) {}

    getProjects(): Observable<Project[]> {
        return this.http.get('/api/projects')
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

        // log this somewhere and format the message well for devs
        console.error(errMsg);

        // our oportunity customize this error
        return Observable.throw(errMsg);
    }
}
