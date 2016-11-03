import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ng2-modal';

import { projectsRouting } from './projects.routing';

import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectFormAddComponent } from './project-form-add/project-form-add.component';

import { ProjectsService } from './projects-service/projects.service';

@NgModule({
    declarations: [
        ProjectListComponent,
        ProjectsComponent,
        ProjectDetailsComponent,
        ProjectFormAddComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ModalModule,
        projectsRouting
    ],
    providers: [
        ProjectsService
    ]
})
export class ProjectsModule {
}
