import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFlowComponent } from './add-flow-form/add-flow-form.component';
import { EditFlowComponent } from './edit-flow-form/edit-flow-form.component';
import { FlowComponent } from './flow/flow.component';

import { FlowResolver } from '../flows/flow-resolvers/flow.resolver';
import { AuthGuard } from '../guards/auth.guard';

const flowsRoutes: Routes = [
    {
        path: 'flow',
        canActivate: [AuthGuard],
        children: [
            { path: '' },
            {
                path: ':id',
                component: FlowComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'add',
                component: AddFlowComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id/edit',
                component: EditFlowComponent,
                canActivate: [AuthGuard],
                resolve: {
                    flow: FlowResolver
                }
            }
        ]
    }
];

export const flowsRouting: ModuleWithProviders = RouterModule.forChild(flowsRoutes);
