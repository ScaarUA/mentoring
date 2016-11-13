import { Pipe, PipeTransform } from '@angular/core';

import { Project } from '../../models/project';

@Pipe({ name: 'ProjectSearch' })
export class ProjectsSearchPipe implements PipeTransform {
    public transform(projects: Project[], token: string): Project[] {
        if (!projects || !token) {
            return projects;
        }
        return projects.filter((item) => {
            return (item.title.indexOf(token) !== -1) ||
                (item.description.indexOf(token) !== -1);
        });
    }
}
