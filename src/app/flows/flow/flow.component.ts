import './flow.scss';

import { Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Flow } from '../../models/flow';

import { FlowsService } from '../flows-service/flows.service';

@Component({
    template: require('./flow.html')
})
export class FlowComponent implements OnInit, OnDestroy {
    public flow: Flow = new Flow();
    private subscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private flowsService: FlowsService
    ) {}

    public ngOnInit() {
        this.subscription = this.route.params.subscribe(
            params => {
                this.flowsService.getFlowById(params['id'])
                    .then(flow => {
                        this.flow = flow;
                    });
            }
        );
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
