import './flow-list.scss';

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Flow } from './../../models/flow';
import { FlowsService } from '../flows-service/flows.service';

import { ProjectService } from '../../projects/project-services/project.service';

@Component({
    selector: 'flow-list',
    template: require('./flow-list.html')
})
export class FlowListComponent implements OnInit, OnDestroy {
    private flows: Flow[];

    constructor(private flowsService: FlowsService,
                private projectService: ProjectService) {
    }

    public ngOnInit() {
        this.projectService.getProjectById()
            .then(project => {
                this.flows = project.flows;
            });
    }

    public ngOnDestroy(){
        this.projectService.clear();
    }

    public removeFlow(id: Number) {
        this.flowsService.removeFlow(id);
    }


}
