import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserAuthComponent } from './user-auth/user-auth.component';

const usersRoutes: Routes = [
    {
        path: 'users',
        pathMatch: 'full',
        redirectTo: 'users/auth'
    },
    {
        component: UserAuthComponent,
        path: 'users/auth'
    }
];

export const userssRouting: ModuleWithProviders = RouterModule.forChild(usersRoutes);
