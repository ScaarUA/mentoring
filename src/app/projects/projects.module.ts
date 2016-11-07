import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'ng2-select/ng2-select';

import { FlowsModule } from '../flows/flows.module';

import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AddProjectComponent } from './add-project-form/add-project-form.component';

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
        AddProjectComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SelectModule,
        FlowsModule,
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
