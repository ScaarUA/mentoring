import './project-list.scss';

import { Component, OnInit } from '@angular/core';

import { Project } from './../../models/project';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'project-list',
    template: require('./project-list.html')
})
export class ProjectListComponent implements OnInit {
    public projects: Array<Project>;
    private sub: any;

    constructor(private route: ActivatedRoute) {
    }

    public ngOnInit() {
        this.sub = this.route.params.subscribe(() => {
            this.projects = this.route.snapshot.data['projects'];
        });
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
