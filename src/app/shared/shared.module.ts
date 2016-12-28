import { NgModule } from '@angular/core';

import { LocalStorageService } from './storage/local-storage.service';
import { ConfigService } from './services/config.service';
import { Whttp } from './services/whttp.service';
import { Device } from './services/device.service';

@NgModule({
    providers: [
        LocalStorageService,
        { provide: Window, useValue: window },
        Whttp,
        Device,
        ConfigService
    ]
})
export class SharedModule { }
