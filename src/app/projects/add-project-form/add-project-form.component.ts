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
    public items: any[];
    private flows: Flow[];
    private selectedFlows: any = [];

    constructor(private projectsService: ProjectsService,
                private route: ActivatedRoute,
                private router: Router) {
        this.project = new Project();
        this.flows = this.route.snapshot.data['flows'];
        this.items = this.filterFlows();
    }

    public submit() {
        this.project.flows = this.filterSelectedFlows();
        this.projectsService.addProject(this.project)
            .then(() => this.navigateToProject());
    }

    public cancel() {
        this.navigateToProject();
    }

    public updateFlows(value: any): void {
        this.selectedFlows = value;
    }

    private navigateToProject() {
        this.router.navigateByUrl('projects');
    }

    private filterFlows() {
        return this.flows.map((flow) => {
            return {
                id: flow._id,
                text: flow.title
            };
        });
    }

    private filterSelectedFlows() {
        return this.selectedFlows.map(flow => flow.id);
    }
}
