import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Project } from '../../models/project';

export const ENDPOINT_PROJECTS = '/api/projects';

@Injectable()
export class ProjectsService {
    constructor(private http: Http) {
    }

    public getProjects(): Promise<Project[]> {
        return this.http.get(ENDPOINT_PROJECTS)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    public getProjectById(id: String): Promise<Project[]> {
        return this.http.get(`${ENDPOINT_PROJECTS}/${id}`)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    public addProject(project: Project) {
        return this.http.post(ENDPOINT_PROJECTS, project)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    public removeProject(id: Number) {
        return this.http.delete(`${ENDPOINT_PROJECTS}/${id}`)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    private handleData(response: Response) {
        let body = response.json() as Project[];
        return body || {};
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
}
