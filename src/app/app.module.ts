import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

/** Modules **/
import { ProjectsModule } from './projects/projects.module';

import { routing } from './app.routing';

/** Components **/
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        HeaderComponent,
        LandingComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        JsonpModule,
        ProjectsModule,
        routing
    ]
})
export class AppModule extends Type { }
