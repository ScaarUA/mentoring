import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlowsComponent } from './flows.component';
import { FlowListComponent } from './flow-list/flow-list.component';
import { FlowSliderComponent } from './flow-slider/flow-slider.component';
import { FlowsService } from './flows-service/flows.service';

import { FlowsResolver } from './flow-resolvers/flows.resolver';

@NgModule({
    declarations: [
        FlowsComponent,
        FlowListComponent,
        FlowSliderComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [
        FlowsService,
        FlowsResolver
    ],
    exports: [
        FlowListComponent,
        FlowSliderComponent
    ]
})
export class FlowsModule {
}
