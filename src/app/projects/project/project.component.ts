import './project.scss';
import { Component, Input } from '@angular/core';

import { Project } from '../../models/project';
import { ProjectsService } from '../project-services/projects.service';

@Component({
    selector: 'project',
    template: require('./project.html')
})
export class ProjectComponent {
    @Input() public project: Project;
    public errorMessage: string;

    constructor(private projectsService: ProjectsService) {
    }

    public removeProject(id: Number) {
        this.projectsService.removeProject(id)
            .catch(error => this.errorMessage = <any> error);
    }
}
