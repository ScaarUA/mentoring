import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectDetailsComponent } from './project-details';
import { ProjectsComponent } from './projects.component';
import { ProjectResolver } from './project-resolvers/project.resolver';

const projectsRoutes: Routes = [
    {
        path: 'projects',
        component: ProjectsComponent,
        children: [
            { path: '' },
            {
                path: 'details/:id',
                component: ProjectDetailsComponent,
                resolve: {
                    project: ProjectResolver
                }
            },
        ]
    }
];

export const projectsRouting: ModuleWithProviders = RouterModule.forChild(projectsRoutes);
