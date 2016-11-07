import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ng2-modal';

import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectFormAddComponent } from './project-form-add/project-form-add.component';

import { projectsRouting } from './projects.routing';
import { ProjectsService } from './projects-service/projects.service';
import { ProjectsResolver } from './project-resolvers/projects.resolver';
import { ProjectResolver } from './project-resolvers/project.resolver';

@NgModule({
    declarations: [
        ProjectsComponent,
        ProjectListComponent,
        ProjectComponent,
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
        ProjectsService,
        ProjectsResolver,
        ProjectResolver
    ]
})
export class ProjectsModule {
}
