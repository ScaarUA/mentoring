import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { Project } from '../../models/project';
import { ProjectsService } from '../projects-service/projects.service';

@Injectable()
export class ProjectsResolver implements Resolve<Project> {
    constructor(private projectsService: ProjectsService) {
    }

    public resolve(): Promise<any> {
        return this.projectsService.getProjects();
    }
}
