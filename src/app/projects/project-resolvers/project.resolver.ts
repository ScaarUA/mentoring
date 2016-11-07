import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { Project } from '../../models/project';
import { ProjectsService } from '../projects-service/projects.service';

@Injectable()
export class ProjectResolver implements Resolve<Project> {
    constructor(private projectsService: ProjectsService) {
    }

    public resolve(route: ActivatedRouteSnapshot): Promise<any> {
        return this.projectsService.getProjectById(route.params['id']);
    }
}
