import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Project } from '../../models/project';

export const ENDPOINT_PROJECTS = '/api/projects';

@Injectable()
export class ProjectService {
    private project: Project = null;

    constructor(private http: Http) {
        this.binding();
    }

    public getProject() {
        return this.project;
    }

    public getProjectById(id?: String): Promise<Project> {
        if (this.project) {
            return new Promise((resolve) => {
                resolve(this.project);
            });
        }
        return this.loadProject(id);
    }

    public clear() {
        this.project = null;
    };

    private loadProject(id: String): Promise<Project> {
        return this.http.get(`${ENDPOINT_PROJECTS}/${id}`)
            .toPromise()
            .then(this.handleData)
            .then(this.saveInStore)
            .catch(this.handleError);
    }

    private saveInStore(project: Project) {
        this.project = project;
        return this.project;
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

    private binding() {
        this.saveInStore = this.saveInStore.bind(this);
    }
}
