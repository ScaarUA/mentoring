import './project-list.html';
import './project-list.scss';

import { Component, OnInit } from '@angular/core';

import { Project } from './../../models/project'
import { ProjectsService } from './../projects-service/projects.service';

@Component({
    selector: 'project-list',
    template: require('./project-list.html')
})
export class ProjectListComponent implements OnInit {
    projects: Array<Project>;
    errorMessage: string;
    constructor(private projectsService: ProjectsService) {
    }

    ngOnInit() {
        this.projectsService.getProjects()
            .subscribe(
                projects => this.projects = projects,
                error => this.errorMessage = <any>error);
    }
}
