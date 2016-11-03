import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectDetailsComponent } from './project-details';
import { ProjectsComponent } from './projects.component';

const projectsRoutes: Routes = [
    {
        path: 'projects',
        component: ProjectsComponent,
        children: [
            { path: '' },
            {
                path: 'details/:id',
                component: ProjectDetailsComponent
            },
        ]
    }
];

export const projectsRouting: ModuleWithProviders = RouterModule.forChild(projectsRoutes);
