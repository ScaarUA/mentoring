import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectDetailsComponent } from './project-details';
import { ProjectsComponent } from './projects.component';
import { AddProjectComponent } from './add-project-form/add-project-form.component';
import { EditProjectComponent } from './edit-project-form/edit-project-form.component';

import { FlowListComponent } from '../flows/flow-list/flow-list.component';
import { FlowSliderComponent } from '../flows/flow-slider/flow-slider.component';

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
                path: ':id/details',
                component: ProjectDetailsComponent,
                resolve: {
                    project: ProjectResolver
                },
                children: [
                    { path: '', redirectTo: 'list'},
                    {
                        path: 'list',
                        component: FlowListComponent
                    },
                    {
                        path: 'slider',
                        component: FlowSliderComponent
                    }
                ]
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
        path: 'project/:id/edit',
        component: EditProjectComponent,
        resolve: {
            project: ProjectResolver,
            flows: FlowsResolver
        },
    }
];

export const projectsRouting: ModuleWithProviders = RouterModule.forChild(projectsRoutes);
