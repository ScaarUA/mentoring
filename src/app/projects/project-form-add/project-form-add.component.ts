import './project-form-add.scss';

import { Component } from '@angular/core';

import { Project } from './../../models/project';
import { ProjectsService } from './../projects-service/projects.service';

@Component({
    selector: 'project-form-add',
    template: require('./project-form-add.html')
})
export class ProjectFormAddComponent {
    public project: Project;

    constructor(private projectsService: ProjectsService) {
        this.project = new Project();
    }

    public submit($event, form) {
        $event.preventDefault();
        this.projectsService.addProject(this.project)
            .then(() => {
                form.close();
            });
    }
}
