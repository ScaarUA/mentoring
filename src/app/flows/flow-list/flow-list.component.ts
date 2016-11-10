import './flow-list.scss';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Flow } from './../../models/flow';
import { FlowsService } from '../flows-service/flows.service';

@Component({
    selector: 'flow-list',
    template: require('./flow-list.html')
})
export class FlowListComponent implements OnInit, OnDestroy {
    private flows: Flow[];
    private sub: any;

    constructor(private route: ActivatedRoute,
                private flowsService: FlowsService) {
    }

    public ngOnInit() {
        this.sub = this.route.parent.params.subscribe(() => {
            const project = this.route.snapshot.parent.data['project'];
            this.flows = project.flows;
        });
    }

    public removeFlow(id: Number) {
        this.flowsService.removeFlow(id);
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
