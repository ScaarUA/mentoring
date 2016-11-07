import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlowsComponent } from './flows.component';
import { FlowsService } from './flows-service/flows.service';

import { FlowsResolver } from './flow-resolvers/flows.resolver';

@NgModule({
    declarations: [
        FlowsComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [
        FlowsService,
        FlowsResolver
    ]
})
export class FlowsModule {
}
