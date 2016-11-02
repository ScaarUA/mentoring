import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';

const usersRoutes: Routes = [
    {
        path: 'users',
        pathMatch: 'full',
        redirectTo: 'users/login'
    },
    {
        component: UserLoginComponent,
        path: 'users/login'
    }
];

export const userssRouting: ModuleWithProviders = RouterModule.forChild(usersRoutes);
