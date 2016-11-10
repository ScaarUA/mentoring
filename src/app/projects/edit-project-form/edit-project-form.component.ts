import './edit-project-form.scss';

import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Project } from './../../models/project';
import { ProjectsService } from '../project-services/projects.service';

@Component({
    selector: 'edit-project-form',
    template: require('./edit-project-form.html')
})
export class EditProjectComponent {
    public project: Project;
    public items: any[];
    private selectedFlows: any[] = [];

    constructor(private projectsService: ProjectsService,
                private route: ActivatedRoute,
                private location: Location) {
        this.init();
    }

    public submit() {
        const id = this.route.snapshot.params['id'];
        this.project.flows = this.filterSelectedFlows();
        this.projectsService.updateProject(id, this.project)
            .then(() => this.back());

    }

    public cancel() {
        this.back();
    }

    public updateFlows(value: any): void {
        this.selectedFlows = value;
    }

    private init(): void {
        const flows = this.route.snapshot.data['flows'];
        this.project = this.route.snapshot.data['project'];
        this.selectedFlows = this.filterFlows(this.project.flows);
        this.items = this.filterFlows(flows);
    }

    private back() {
        this.location.back();
    }

    private filterFlows(flows: any[]) {
        return flows.map((flow) => {
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
