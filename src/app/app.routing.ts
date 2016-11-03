import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/landing/landing.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'landing'
    },
    {
        component: LandingComponent,
        path: 'landing'
    },
    {
        component: UsersComponent,
        path: 'users'
    },
    {
        component: PageNotFoundComponent,
        path: '**'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
