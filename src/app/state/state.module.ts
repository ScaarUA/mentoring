import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StateComponent } from './state.component';
import { StateAddComponent } from './state-add/state-add.component';
import { InputFocusDirective } from '../shared/input/input-focus.directive';
import { ImagePreviewDirective } from '../shared/input/image-preview.directive';

import { StateService } from './state-service/state.service';

@NgModule({
    declarations: [
        StateComponent,
        StateAddComponent,
        InputFocusDirective,
        ImagePreviewDirective
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [
        StateService
    ]
})
export class StateModule {
}
