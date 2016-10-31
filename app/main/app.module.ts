import { NgModule, Type } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { HeaderComponent } from '../components/header/header.component';
import { LandingComponent } from '../components/landing/landing.component';
import { HomeComponent } from '../components/home/home.component';
import { ProjectListComponent } from '../components/home/project-list/project-list.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        HeaderComponent,
        LandingComponent,
        HomeComponent,
        ProjectListComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        routing
    ]
})
export class AppModule extends Type { }
