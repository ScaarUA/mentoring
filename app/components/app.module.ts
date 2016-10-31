import { NgModule, Type } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        LandingComponent
    ],
    imports: [
        BrowserModule
    ]
})
export class AppModule extends Type { }
