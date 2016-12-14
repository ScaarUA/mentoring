import { Injectable, Inject } from '@angular/core';

interface Window { device: any; }

@Injectable()
export class ConfigService {
    constructor(
        @Inject(Window) private window: Window
    ) {}

    public isSite() {
        return !this.window.device || this.window.device === 'browser';
    }

    public isDevice() {
        return !!this.window.device;
    }

    public isAndroid() {
        return this.window.device && this.window.device.platform === 'android';
    }
}
