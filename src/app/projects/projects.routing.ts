import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list';
// import { ProjectFormComponent } from './project-form';

const projectsRoutes: Routes = [
  // {
  //   path: 'edit/:id',
  //   component: ProjectFormComponent
  // }
];

export const projectsRouting: ModuleWithProviders = RouterModule.forChild(projectsRoutes);
