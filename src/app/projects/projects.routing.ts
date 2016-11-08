import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectDetailsComponent } from './project-details';
import { ProjectsComponent } from './projects.component';
import { AddProjectComponent } from './add-project-form/add-project-form.component';
import { EditProjectComponent } from './edit-project-form/edit-project-form.component';

import { ProjectsResolver } from './project-resolvers/projects.resolver';
import { ProjectResolver } from './project-resolvers/project.resolver';
import { FlowsResolver } from '../flows/flow-resolvers/flows.resolver';

const projectsRoutes: Routes = [
    {
        path: 'projects',
        component: ProjectsComponent,
        resolve: {
            projects: ProjectsResolver
        },
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
    },
    {
        path: 'project/add',
        component: AddProjectComponent,
        resolve: {
            flows: FlowsResolver
        },
    },
    {
        path: 'project/edit/:id',
        component: EditProjectComponent,
        resolve: {
            project: ProjectResolver,
            flows: FlowsResolver
        },
    }
];

export const projectsRouting: ModuleWithProviders = RouterModule.forChild(projectsRoutes);
