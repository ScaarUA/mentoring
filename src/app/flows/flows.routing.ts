import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFlowComponent } from './add-flow-form/add-flow-form.component';
import { EditFlowComponent } from './edit-flow-form/edit-flow-form.component';
import { FlowComponent } from './flow/flow.component';
import { StateComponent } from '../state/state.component';
import { StateAddComponent } from '../state/state-add/state-add.component';

import { FlowResolver } from '../flows/flow-resolvers/flow.resolver';
import { AuthGuard } from '../guards/auth.guard';

const flowsRoutes: Routes = [
    {
        path: 'flow',
        canActivate: [AuthGuard],
        children: [
            { path: '' },
            {
                path: 'add',
                component: AddFlowComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id',
                component: FlowComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id/state',
                canActivate: [AuthGuard],
                children: [
                    {
                        path: 'add',
                        component: StateAddComponent
                    },
                    {
                        path: ':stateId',
                        component: StateComponent
                    }
                ]
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
