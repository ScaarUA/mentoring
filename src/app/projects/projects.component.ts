import './projects.scss';

import { Component } from '@angular/core';

import { Project } from '../models/project';
import { ProjectsService } from './projects-service/projects.service';

@Component({
    selector: 'projects',
    template: require('./projects.html')
})
export class ProjectsComponent {
    private token: string;
    private cache: Project[];
    constructor(private projectsService: ProjectsService) {
        this.cache = [...this.projectsService.getProjectsStore()];
    }

    public onChange($event) {
        // TODO rewrite
        this.token = $event.target.value;
        if (this.token === '') {
            this.projectsService.setProjectsStore(this.cache);
            return;
        }
        const projects = this.projectsService.getProjectsStore();
        const filteredProjects = this.searchProjects(projects);
        this.projectsService.setProjectsStore(filteredProjects);
    }

    private searchProjects(projects: Project[]): Project[] {
        return projects.filter((project) => {
            return project.title.indexOf(this.token) !== -1;
        });
    }
}
