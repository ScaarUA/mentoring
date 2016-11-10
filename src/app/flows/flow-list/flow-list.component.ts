import './flow-list.scss';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Flow } from './../../models/flow';

@Component({
    selector: 'flow-list',
    template: require('./flow-list.html')
})
export class FlowListComponent implements OnInit {
    private flows: Flow[];

    constructor(private route: ActivatedRoute) {
    }

    public ngOnInit() {
            const project = this.route.snapshot.parent.data['project'];
            this.flows = project.flows;
    }
}
