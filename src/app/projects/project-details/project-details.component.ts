import './project-details.scss';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from './../../models/project';

@Component({
    selector: 'project-details',
    template: require('./project-details.html')
})
export class ProjectDetailsComponent implements OnInit, OnDestroy  {
    public project: Project;
    private sub: any;

    constructor(private route: ActivatedRoute) {
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(() => {
            this.project = this.route.snapshot.data['project'];
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
