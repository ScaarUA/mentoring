import './add-project-form.scss';

import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Project } from './../../models/project';
import { Flow } from './../../models/flow';
import { ProjectsService } from '../project-services/projects.service';

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
                private location: Location) {
        this.init();
    }

    public submit() {
        this.project.flows = this.filterSelectedFlows();
        this.projectsService.addProject(this.project)
            .then(() => this.back());
    }

    public cancel() {
        this.location.back();
    }

    public updateFlows(value: any): void {
        this.selectedFlows = value;
    }

    private back() {
        this.location.back();
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

    private init() {
        this.project = new Project();
        this.flows = this.route.snapshot.data['flows'];
        this.items = this.filterFlows();
    }
}
