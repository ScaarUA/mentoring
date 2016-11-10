import './edit-flow-form.scss';

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Flow } from './../../models/flow';
import { FlowsService } from './../flows-service/flows.service';

@Component({
    selector: 'edit-flow-form',
    template: require('./edit-flow-form.html')
})
export class EditFlowComponent implements OnInit {
    public flow: Flow;

    constructor(private flowsService: FlowsService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    public ngOnInit() {
        this.flow = this.route.snapshot.data['flow'];
    }

    public submit() {
        const id = this.route.snapshot.params['id'];
        this.flow.state = '57fe2bd1b0d5530dc8457d69'; // TODO add state
        this.flowsService.updateFlow(id, this.flow)
            .then(() => this.back());

    }

    public cancel() {
        this.back();
    }

    private back() {
        this.location.back();
    }
}
