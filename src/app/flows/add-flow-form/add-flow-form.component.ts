import './add-flow-form.scss';

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Flow } from './../../models/flow';
import { FlowsService } from './../flows-service/flows.service';

@Component({
    selector: 'add-flow-form',
    template: require('./add-flow-form.html')
})
export class AddFlowComponent implements OnInit {
    public flow: Flow;

    constructor(private flowsService: FlowsService,
                private location: Location) {
    }

    public ngOnInit() {
        this.flow = new Flow();
    };

    public submit() {
        this.flow.state = '57fe2bd1b0d5530dc8457d69'; // TODO add state
        this.flowsService.addFlow(this.flow)
            .then(() => this.back());
    }

    public cancel() {
        this.location.back();
    }

    private back() {
        this.location.back();
    }
}
