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
import { EditProjectComponent } from './edit-project-form/edit-project-form.component';

import { projectsRouting } from './projects.routing';
import { ProjectsService } from './project-services/projects.service';
import { ProjectService } from './project-services/project.service';
import { ProjectsResolver } from './project-resolvers/projects.resolver';
import { ProjectResolver } from './project-resolvers/project.resolver';

import { ProjectsSearchPipe } from './project-pipes/projects-search.pipe';

@NgModule({
    declarations: [
        ProjectsComponent,
        ProjectListComponent,
        ProjectComponent,
        ProjectDetailsComponent,
        AddProjectComponent,
        EditProjectComponent,
        ProjectsSearchPipe
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
        ProjectService,
        ProjectsResolver,
        ProjectResolver
    ]
})
export class ProjectsModule {
}
