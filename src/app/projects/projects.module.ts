import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { projectsRouting } from './projects.routing';

import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent  } from './project-details/project-details.component';

import { ProjectsService } from './projects-service/projects.service';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectsComponent,
    ProjectDetailsComponent
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
