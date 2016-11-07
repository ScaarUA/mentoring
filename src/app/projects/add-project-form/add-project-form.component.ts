import './add-project-form.scss';

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from './../../models/project';
import { Flow } from './../../models/Flow';
import { ProjectsService } from './../projects-service/projects.service';

@Component({
    selector: 'add-project-form',
    template: require('./add-project-form.html')
})
export class AddProjectComponent {
    public project: Project;
    public flows: Flow[];

    constructor(private projectsService: ProjectsService,
                private route: ActivatedRoute,
                private router: Router) {
        this.project = new Project();
        this.flows = this.route.snapshot.data['flows'];
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
