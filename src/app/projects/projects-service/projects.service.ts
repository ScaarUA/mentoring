import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Project } from '../../models/project';

export const ENDPOINT_PROJECTS = '/api/projects';

@Injectable()
export class ProjectsService {
    private projects: Project[] = [];

    constructor(private http: Http) {
        this.binding();
    }

    public getProjectsStore(): Project[] {
        return this.projects;
    }

    public setProjectsStore(projects: Project[]) {
        this.projects.length = 0;
        this.projects.push(...projects);
    }

    public getProjects(): Promise<Project[]> {
        return this.loadProjects();
    }

    public loadProjects(): Promise<Project[]> {
        return this.http.get(ENDPOINT_PROJECTS)
            .toPromise()
            .then(this.handleData)
            .then(this.saveProjectsInStore)
            .catch(this.handleError);
    }

    public getProjectById(id: String): Promise<Project[]> {
        return this.http.get(`${ENDPOINT_PROJECTS}/${id}`)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    public addProject(project: Project) {
        delete project._id;
        return this.http.post(ENDPOINT_PROJECTS, project)
            .toPromise()
            .then(this.handleData)
            .then(this.addProjectInStore)
            .catch(this.handleError);
    }

    public removeProject(id: Number) {
        return this.http.delete(`${ENDPOINT_PROJECTS}/${id}`)
            .toPromise()
            .then(() => {
                this.removeProjectFromStore(id);
            })
            .catch(this.handleError);
    }

    public updateProject(id: Number, project: Project) {
        return this.http.put(`${ENDPOINT_PROJECTS}/${id}`, project)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    private findProjectById(id: Number): Project {
        return this.projects.find(project => id === project._id);
    }

    private saveProjectsInStore(projects: Project[]): Project[] {
        this.projects = projects;
        return this.projects;
    }

    private addProjectInStore(project: Project) {
        this.projects.push(project);
    }

    private removeProjectFromStore(id: Number) {
        const project = this.findProjectById(id);
        const index = this.projects.indexOf(project);
        if (index > -1) {
            this.projects.splice(index, 1);
        }
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
        this.saveProjectsInStore = this.saveProjectsInStore.bind(this);
        this.addProjectInStore = this.addProjectInStore.bind(this);
    }
}
