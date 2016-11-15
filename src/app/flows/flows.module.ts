import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StateModule } from '../state/state.module';

import { FlowsComponent } from './flows.component';
import { FlowListComponent } from './flow-list/flow-list.component';
import { FlowSliderComponent } from './flow-slider/flow-slider.component';
import { AddFlowComponent } from './add-flow-form/add-flow-form.component';
import { EditFlowComponent } from './edit-flow-form/edit-flow-form.component';
import { FlowComponent } from './flow/flow.component';

import { flowsRouting } from './flows.routing';
import { FlowsService } from './flows-service/flows.service';
import { FlowsResolver } from './flow-resolvers/flows.resolver';
import { FlowResolver } from './flow-resolvers/flow.resolver';

@NgModule({
    declarations: [
        FlowsComponent,
        FlowListComponent,
        FlowSliderComponent,
        AddFlowComponent,
        EditFlowComponent,
        FlowComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        StateModule,
        flowsRouting
    ],
    providers: [
        FlowsService,
        FlowsResolver,
        FlowResolver
    ],
    exports: [
        FlowListComponent,
        FlowSliderComponent
    ]
})
export class FlowsModule {
}
