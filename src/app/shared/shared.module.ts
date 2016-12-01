import { NgModule } from '@angular/core';

import { LocalStorageService } from './storage/local-storage.service';
import { Whttp } from './services/whttp.service';

@NgModule({
    providers: [
        LocalStorageService,
        { provide: Window, useValue: window },
        Whttp
    ]
})
export class SharedModule { }
