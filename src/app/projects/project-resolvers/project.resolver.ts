import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { Project } from '../../models/project';
import { ProjectService } from '../project-services/project.service';

@Injectable()
export class ProjectResolver implements Resolve<Project> {
    constructor(private projectService: ProjectService) {
    }

    public resolve(route: ActivatedRouteSnapshot): Promise<any> {
        return this.projectService.getProjectById(route.params['id']);
    }
}
