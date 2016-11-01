import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { projectsRouting } from './projects.routing';

import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
// import { ProjectComponent } from './project/project.component';
// import { ProjectFormComponent }  from './project-form/project-form.component';
//
import { ProjectsService } from './projects-service/projects.service';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectsComponent,
    // ProjectComponent,
    // ProjectFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    projectsRouting
  ],
  providers: [
    ProjectsService
  ]
})
export class ProjectsModule {}
