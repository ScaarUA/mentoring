import { Injectable, Inject } from '@angular/core';

@Injectable()
export class LocalStorageService {
    private localStorage = this.window.localStorage;

    constructor(
        @Inject(Window) private window: Window
    ) {}

    public set(key, value) {
        let stringValue = JSON.stringify(value);

        this.localStorage.setItem(key, stringValue);
    }

    public get(key) {
        let jsonVal = this.localStorage.getItem(key);

        return JSON.parse(jsonVal);
    }

    public remove(key) {
        this.localStorage.removeItem(key);
    }
}
