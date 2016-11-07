import './add-project-form.scss';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from './../../models/project';
import { ProjectsService } from './../projects-service/projects.service';

@Component({
    selector: 'add-project-form',
    template: require('./add-project-form.html')
})
export class AddProjectComponent {
    public project: Project;

    constructor(private projectsService: ProjectsService,
                private router: Router) {
        this.project = new Project();
    }

    public submit($event) {
        $event.preventDefault();
        this.projectsService.addProject(this.project)
            .then(() => this.navigateToProject());
    }

    public cancel() {
        this.navigateToProject();
    }

    private navigateToProject() {
        this.router.navigateByUrl('projects');
    }
}
