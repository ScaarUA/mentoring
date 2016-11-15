import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StateComponent } from './state.component';
import { StateAddComponent } from './state-add/state-add.component';

@NgModule({
    declarations: [
        StateComponent,
        StateAddComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class StateModule {
}
