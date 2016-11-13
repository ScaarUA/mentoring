import './project-list.scss';

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Project } from './../../models/project';

@Component({
    selector: 'project-list',
    template: require('./project-list.html')
})
export class ProjectListComponent implements OnInit {
    @Input() public token: String;
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
