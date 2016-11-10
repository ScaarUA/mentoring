import './flow-slider.scss';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Flow } from './../../models/flow';

@Component({
    selector: 'flow-slider',
    template: require('./flow-slider.html')
})
export class FlowSliderComponent implements OnInit {
    private flows: Flow[];
    private currentSlide: number = 0;
    private sub: any;

    constructor(private route: ActivatedRoute) {
    }

    public ngOnInit() {
        this.sub = this.route.parent.params.subscribe(() => {
            const project = this.route.snapshot.parent.data['project'];
            this.flows = project.flows;
        });
    }

    public isOnScreen(index) {
        return index === this.currentSlide;
    }

    public next() {
        if (this.currentSlide === this.flows.length - 1) {
            this.currentSlide = 0;
            return;
        }
        this.currentSlide++;
    }

    public prev() {
        if (this.currentSlide === 0) {
            this.currentSlide = this.flows.length - 1;
            return;
        }
        this.currentSlide--;
    }
}
