import './project-details.scss';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from './../../models/project';
import { ProjectsService } from './../projects-service/projects.service';

@Component({
    selector: 'project-details',
    template: require('./project-details.html')
})
export class ProjectDetailsComponent implements OnInit, OnDestroy  {
    public project: Array<Project> = [];
    public errorMessage: string;
    private sub: any;

    constructor(private projectsService: ProjectsService,
                private route: ActivatedRoute) {
    }

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.projectsService.getProjectById(params['id'])
                .then(project => this.project = project)
                .catch(error => this.errorMessage = <any> error);
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
