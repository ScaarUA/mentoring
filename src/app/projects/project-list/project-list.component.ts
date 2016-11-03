import './project-list.scss';

import { Component, OnInit } from '@angular/core';

import { Project } from './../../models/project';
import { ProjectsService } from './../projects-service/projects.service';

@Component({
    selector: 'project-list',
    template: require('./project-list.html')
})
export class ProjectListComponent implements OnInit {
    public projects: Array<Project>;
    public errorMessage: string;

    constructor(private projectsService: ProjectsService) {
    }

    public ngOnInit() {
        this.projectsService.getProjects()
            .then(projects => this.projects = projects)
            .catch(error => this.errorMessage = <any> error);
    }
}
