import { NgModule } from '@angular/core';

import { LocalStorageService } from './storage/local-storage.service';

@NgModule({
    providers: [
        LocalStorageService,
        { provide: Window, useValue: window }
    ]
})
export class SharedModule { }
