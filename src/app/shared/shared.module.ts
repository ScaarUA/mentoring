import { NgModule } from '@angular/core';

import { LocalStorageService } from './storage/local-storage.service';
import { ConfigService } from './services/config.service';
import { Whttp } from './services/whttp.service';

@NgModule({
    providers: [
        LocalStorageService,
        { provide: Window, useValue: window },
        Whttp,
        ConfigService
    ]
})
export class SharedModule { }
