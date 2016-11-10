import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFlowComponent } from './add-flow-form/add-flow-form.component';
import { EditFlowComponent } from './edit-flow-form/edit-flow-form.component';

import { FlowResolver } from '../flows/flow-resolvers/flow.resolver';

const flowsRoutes: Routes = [
    {
        path: 'flow',
        children: [
            { path: '' },
            {
                path: 'add',
                component: AddFlowComponent
            },
            {
                path: ':id/edit',
                component: EditFlowComponent,
                resolve: {
                    flow: FlowResolver
                }
            }
        ]
    }
];

export const flowsRouting: ModuleWithProviders = RouterModule.forChild(flowsRoutes);
