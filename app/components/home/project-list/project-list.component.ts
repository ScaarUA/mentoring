import './project-list.html';
import './project-list.scss';

import { Http, Response } from '@angular/http';
import { Component, Injectable, OnInit } from '@angular/core';
import 'rxjs/Rx';

import { Project } from './../../../models/project'


@Component({
    selector: 'project-list',
    template: require('./project-list.html')
})
export class ProjectListComponent implements OnInit {
    projects: Array<Project>;

    constructor(
        private http: Http
    ) {
    }

    ngOnInit() {
        this.http.get('/api/projects')
            .map((res: Response) => res.json())
                .subscribe(res => {
                    this.projects = res;
                });
    }
}
